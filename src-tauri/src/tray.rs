//! Tray icon: the way back to a window that closing hid.
//!
//! Windows only. Closing a window hides it so the harness children keep
//! running, and a hidden window drops off the taskbar, so without this the
//! windows would be unreachable.
//!
//! The menu text follows the interface language. The renderer owns that
//! choice, so `tray_set_locale` rebuilds the menu whenever it changes; this
//! module only keeps the last locale it was told about.

use std::sync::Mutex;

use tauri::menu::{MenuBuilder, MenuItemBuilder};
use tauri::tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent};
use tauri::AppHandle;

const SHOW: &str = "tray_show";
const QUIT: &str = "tray_quit";

/// Same tags as the TypeScript `Locale` union.
#[derive(Clone, Copy, PartialEq, Eq)]
enum Locale {
    En,
    ZhCn,
}

impl Locale {
    fn from_tag(tag: &str) -> Self {
        // This fork ships Chinese as the only interface language, so anything
        // but an explicit `en` tag (which the renderer no longer sends) maps
        // to Chinese.
        match tag {
            "en" => Self::En,
            _ => Self::ZhCn,
        }
    }

    fn show(self) -> &'static str {
        match self {
            Self::En => "Show MonoCode",
            Self::ZhCn => "显示 MonoCode",
        }
    }

    fn quit(self) -> &'static str {
        match self {
            Self::En => "Quit MonoCode",
            Self::ZhCn => "退出 MonoCode",
        }
    }
}

static LOCALE: Mutex<Locale> = Mutex::new(Locale::ZhCn);

pub fn install(app: &AppHandle) -> tauri::Result<()> {
    let locale = *LOCALE.lock().expect("tray locale lock");
    build_menu(app, locale)?;
    Ok(())
}

/// Rebuild the tray menu in `tag`'s language. Called from the renderer when the
/// user picks another interface language.
#[tauri::command]
pub fn tray_set_locale(app: AppHandle, locale: String) -> Result<(), String> {
    let next = Locale::from_tag(&locale);
    {
        let mut current = LOCALE.lock().map_err(|e| e.to_string())?;
        if *current == next {
            return Ok(());
        }
        *current = next;
    }
    build_menu(&app, next).map_err(|e| e.to_string())
}

fn build_menu(app: &AppHandle, locale: Locale) -> tauri::Result<()> {
    let show = MenuItemBuilder::with_id(SHOW, locale.show()).build(app)?;
    let quit = MenuItemBuilder::with_id(QUIT, locale.quit()).build(app)?;
    let menu = MenuBuilder::new(app).items(&[&show, &quit]).build()?;

    // Reuse the existing tray icon when it is already installed so a language
    // change does not flash the icon or lose its click handlers.
    if let Some(tray) = app.tray_by_id("main") {
        tray.set_menu(Some(menu))?;
        return Ok(());
    }

    let mut tray = TrayIconBuilder::with_id("main")
        .tooltip("MonoCode")
        .menu(&menu)
        // Left click reopens; the menu stays on the right button.
        .show_menu_on_left_click(false)
        .on_menu_event(|app, event| match event.id().as_ref() {
            SHOW => {
                let _ = crate::window::show_hidden_or_open_new(app);
            }
            QUIT => crate::window::request_quit(app),
            _ => {}
        })
        .on_tray_icon_event(|tray, event| {
            if let TrayIconEvent::Click {
                button: MouseButton::Left,
                button_state: MouseButtonState::Up,
                ..
            } = event
            {
                let _ = crate::window::show_hidden_or_open_new(tray.app_handle());
            }
        });

    if let Some(icon) = app.default_window_icon().cloned() {
        tray = tray.icon(icon);
    }

    tray.build(app)?;
    Ok(())
}
