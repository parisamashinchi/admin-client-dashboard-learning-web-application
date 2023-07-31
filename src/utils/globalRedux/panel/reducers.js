import * as constants from "./constants";
import config from "src/config";
import { fromJS } from "immutable";
import { createReducer } from "redux-immutablejs";

const initialState = fromJS({
  isOpen: [], //for active default menu
  isTrigger: [], //for active default menu, set blank for horizontal
  ...config,
  isFullScreen: false, // static can't change
  rtlLayout: true
});
let trigger = [];
let open = [];
export default {
  [constants.PANEL]: createReducer(initialState, {
    [constants.COLLAPSE_MENU]: (state, action) =>
      state.merge({
        ["collapseMenu"]: !state.getIn(["collapseMenu"])
      }),
    [constants.COLLAPSE_TOGGLE]: (state, action) => {
      if (action.menu.type === "sub") {
        open = state.getIn(["isOpen"], false);
        trigger = state.getIn(["isTrigger"], false);
        const triggerIndex = trigger.indexOf(action.menu.id);
        if (triggerIndex > -1) {
          open = open.filter(item => item !== action.menu.id);
          trigger = trigger.filter(item => item !== action.menu.id);
        }
        if (triggerIndex === -1) {
          open = [...open, action.menu.id];
          trigger = [...trigger, action.menu.id];
        }
      } else {
        open = state.getIn(["isOpen"], false);
        const triggerIndex = state.getIn(["isTrigger"]).indexOf(action.menu.id);
        trigger = triggerIndex === -1 ? [action.menu.id] : [];
        open = triggerIndex === -1 ? [action.menu.id] : [];
      }
      return state.merge({
        ["isOpen"]: open,
        ["isTrigger"]: trigger
      });
    },
    [constants.NAV_CONTENT_LEAVE]: (state, action) =>
      state.merge({
        ["isOpen"]: open,
        ["isTrigger"]: trigger
      }),
    [constants.NAV_COLLAPSE_LEAVE]: (state, action) => {
      open = state.isOpen;
      trigger = state.isTrigger;
      const triggerIndex = trigger.indexOf(action.menu.id);
      if (triggerIndex > -1) {
        open = open.filter(item => item !== action.menu.id);
        trigger = trigger.filter(item => item !== action.menu.id);
      }
      return state.merge({
        ["isOpen"]: open,
        ["isTrigger"]: trigger
      });
    },
    [constants.FULL_SCREEN]: (state, action) =>
      state.merge({
        ["isFullScreen"]: !state.getIn(["isFullScreen"])
      }),
    [constants.FULL_SCREEN_EXIT]: (state, action) =>
      state.merge({
        ["isFullScreen"]: false
      }),
    [constants.CHANGE_LAYOUT]: (state, action) =>
      state.merge({
        ["layout"]: action.layout
      }),
    [constants.CHANGE_PRE_LAYOUT]: (state, action) =>
      state.merge({
        ["preLayout"]: action.preLayout
      }),
    [constants.LAYOUT_TYPE]: (state, action) =>
      state.merge({
        ["layoutType"]: action.layoutType,
        ["navBackColor"]:
          action.layoutType === "dark" &&
          initialState.getIn(["navBackColor"], "navbar-default") ===
            "navbar-default"
            ? "navbar-dark"
            : state.navBackColor,
        ["navBrandColor"]:
          action.layoutType === "dark" &&
          initialState.getIn(["navBrandColor"], "navbar-default") ===
            "brand-default"
            ? "brand-dark"
            : state.navBrandColor,
        ["navBackImage"]: initialState.getIn(["navBackImage"]),
        ["headerBackColor"]: initialState.getIn(["headerBackColor"])
      }),
    [constants.NAV_BACK_COLOR]: (state, action) =>
      state.merge({
        ["navBackColor"]: action.navBackColor,
        ["navBackImage"]: initialState.getIn(["navBackImage"]),
        ["navBrandColor"]: "brand-default",
        ["layoutType"]:
          state.layoutType === "menu-light" ? "menu-dark" : state.layoutType
      }),
    [constants.NAV_BACK_IMAGE]: (state, action) =>
      state.merge({
        ["layoutType"]: "menu-dark",
        ["navBackImage"]: action.navBackImage,
        ["navBrandColor"]: "",
        ["navBackColor"]: ""
      }),
    [constants.NAV_BRAND_COLOR]: (state, action) =>
      state.merge({
        ["navBrandColor"]: action.navBrandColor
      }),
    [constants.HEADER_BACK_COLOR]: (state, action) =>
      state.merge({
        ["headerBackColor"]: action.headerBackColor
      }),
    [constants.NAV_ICON_COLOR]: (state, action) =>
      state.merge({
        ["navIconColor"]: action.navIconColor
      }),
    [constants.RTL_LAYOUT]: (state, action) =>
      state.merge({
        ["rtlLayout"]: !state.getIn(["rtlLayout"])
      }),
    [constants.NAV_FIXED_LAYOUT]: (state, action) =>
      state.merge({
        ["navFixedLayout"]: !state.getIn(["navFixedLayout"])
      }),
    [constants.HEADER_FIXED_LAYOUT]: (state, action) =>
      state.merge({
        ["headerFixedLayout"]: !state.getIn(["headerFixedLayout"]),
        ["headerBackColor"]:
          !state.getIn(["headerFixedLayout"]) &&
          initialState.getIn(["headerBackColor", "header-default"]) ===
            "header-default"
            ? "header-blue"
            : state.headerBackColor,
        ["navBrandColor"]: !state.getIn(["headerFixedLayout"])
          ? "brand-default"
          : initialState.getIn(["navBrandColor"])
      }),
    [constants.BOX_LAYOUT]: (state, action) =>
      state.merge({
        ["boxLayout"]: !state.getIn(["boxLayout"])
      }),
    [constants.LAYOUT6_BACKGROUND]: (state, action) =>
      state.merge({
        ["layout6Background"]: action.value.layout6Background,
        ["layout6BackSize"]: action.value.layout6BackSize
      }),
    [constants.NAV_DROPDOWN_ICON]: (state, action) =>
      state.merge({
        ["navDropdownIcon"]: action.navDropdownIcon
      }),
    [constants.NAV_LIST_ICON]: (state, action) =>
      state.merge({
        ["navListIcon"]: action.navListIcon
      }),
    [constants.NAV_ACTIVE_LIST_COLOR]: (state, action) =>
      state.merge({
        ["navActiveListColor"]: action.navActiveListColor
      }),
    [constants.NAV_LIST_TITLE_COLOR]: (state, action) =>
      state.merge({
        ["navListTitleColor"]: action.navListTitleColor
      }),
    [constants.NAV_LIST_TITLE_HIDE]: (state, action) =>
      state.merge({
        ["navListTitleHide"]: action.navListTitleHide
      }),
    [constants.CONFIG_BLOCK]: (state, action) =>
      state.merge({
        ["configBlock"]: !state.getIn(["configBlock"])
      }),
    [constants.RESET]: (state, action) =>
      state.merge({
        ["layout"]: initialState.getIn(["layout"]),
        ["preLayout"]: initialState.getIn(["preLayout"]),
        ["collapseMenu"]: initialState.getIn(["collapseMenu"]),
        ["layoutType"]: initialState.getIn(["layoutType"]),
        ["navIconColor"]: initialState.getIn(["navIconColor"]),
        ["headerBackColor"]: initialState.getIn(["headerBackColor"]),
        ["navBackColor"]: initialState.getIn(["navBackColor"]),
        ["navBrandColor"]: initialState.getIn(["navBrandColor"]),
        ["navBackImage"]: initialState.getIn["navBackImage"],
        ["rtlLayout"]: initialState.getIn(["rtlLayout"]),
        ["navFixedLayout"]: initialState.getIn(["navFixedLayout"]),
        ["headerFixedLayout"]: initialState.getIn(["headerFixedLayout"]),
        ["boxLayout"]: initialState.getIn(["boxLayout"]),
        ["navDropdownIcon"]: initialState.getIn(["navDropdownIcon"]),
        ["navListIcon"]: initialState.getIn(["navListIcon"]),
        ["navActiveListColor"]: initialState.getIn(["navActiveListColor"]),
        ["navListTitleColor"]: initialState.getIn(["navListTitleColor"]),
        ["navListTitleHide"]: initialState.getIn(["navListTitleHide"]),
        ["layout6Background"]: initialState.getIn(["layout6Background"])
      })
  })
};
