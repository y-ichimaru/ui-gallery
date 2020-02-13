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
import { ConfirmDialogContent } from "./components/ConfirmDialogContent";
import ElapsedTimeClock from "./components/ElapsedTimeClock.vue";
import VolumeIndicator from "./components/VolumeIndicator.vue";
import ItemWrapGrid from "./components/ItemWrapGrid.vue";
import ContextMenu from "./components/ContextMenu.vue";
import NetworkTester from "./components/NetworkTester.vue";
import AudioOutputTester from "./components/AudioOutputTester.vue";
import AudioTester from "./components/AudioTester.vue";
import FileDropArea from "./components/FileDropArea.vue";
/**
 * @package Libs
 * @description 汎用のライブラリをまとめたパッケージです．
 */
import DragableBox from "./libs/UI/DragableBox";
import { MultiCastDelegate as Delegate } from "./libs/Core/Delegate";
import { IDisposeable } from "./libs/Core/IDisposable";
import { Logger } from "./libs/logger";
import { DeviceInfo, DeviceList, DeviceMediaStreamWrapper, DeviceStreamManager, RtcMediaStreamWrapper } from "./libs/WebRtc/DeviceStreamManager";
import { WebSocketData, WebSocketProvider } from "./libs/WebSocket/WebSocket";
import { getUrlParameter } from "./libs/utilities/StringUtility";
import * as WebRtcConfig from "./libs/WebRtc/WebRtcConfig";
import { ScreenShareRoom } from "./libs/WebRtc/ScreenShareRoom";
import { VideoChatConnection, PeerStream } from "./libs/WebRtc/VideoChatRoom";
import { BrowserType, BrowserUtility } from "./libs/utilities/BrowserUtility";
import "./style.scss";
declare global {
    var logger: Logger;
}
export { ColorPalette, DragableBoxView, DateTimeText, DateText, ConfirmDialog, ElapsedTimeClock, VolumeIndicator, ConfirmDialogContent, DialogBase, ItemWrapGrid, ContextMenu, NetworkTester, AudioOutputTester, AudioTester, FileDropArea, DragableBox, Delegate, DeviceInfo, DeviceList, DeviceMediaStreamWrapper, DeviceStreamManager, RtcMediaStreamWrapper, WebRtcConfig, ScreenShareRoom, VideoChatConnection, PeerStream, IDisposeable, getUrlParameter, BrowserType, BrowserUtility, Logger, WebSocketData, WebSocketProvider };