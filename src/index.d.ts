/**
 * @package UI-Gallery
 * @description 汎用のVue Component群をまとめたパッケージです．
 */
import ColorPalette from "./components/ColorPalette.vue";
import DragableBoxView from "./components/DragableBox.vue";
import DateTimeText from "./components/DateTimeText.vue";
import DateText from "./components/DateText.vue";
import DialogBase from "./components/DialogBase.vue";
import ConfirmDialog from "./components/ConfirmDialog.vue";
import {ConfirmDialogContent} from "./components/ConfirmDialogContent";
import ElapsedTimeClock from "./components/ElapsedTimeClock.vue";
import VolumeIndicator from "./components/VolumeIndicator.vue";
import {Logger} from "./libs/logger";
/**
 * @package Libs
 * @description 汎用のライブラリをまとめたパッケージです．
 */
import DragableBox from "./libs/UI/DragableBox";
import {MultiCastDelegate as Delegate} from "./libs/Core/Delegate";
import {DeviceInfo, DeviceList, DeviceMediaStreamWrapper, DeviceStreamManager, RtcMediaStreamWrapper} from "./libs/WebRtc/DeviceStreamManager";
import * as WebRtcConfig from "./libs/WebRtc/WebRtcConfig";
import {ScreenShareRoom} from "./libs/WebRtc/ScreenShareRoom";
import {VideoChatConnection, PeerStream} from "./libs/WebRtc/VideoChatRoom";
import {getUrlParameter} from "./libs/utilities/StringUtility";
import {BrowserType, BrowserUtility} from "./libs/utilities/BrowserUtility";
import "./style.scss";
import GudaGuda from "./components/GudaGuda.vue";
declare global
{
    var logger: Logger;
}
export {Logger, BrowserType, GudaGuda, DialogBase, ConfirmDialogContent, BrowserUtility, ColorPalette, DragableBoxView, DateTimeText, DateText, ConfirmDialog, ElapsedTimeClock, VolumeIndicator, DragableBox, getUrlParameter, Delegate, DeviceInfo, DeviceList, DeviceMediaStreamWrapper, DeviceStreamManager, RtcMediaStreamWrapper, WebRtcConfig, ScreenShareRoom, VideoChatConnection, PeerStream};
