/**
 * @package UI-Gallery
 * @description 汎用のVue Component群をまとめたパッケージです．
 */
import ColorPalette from "./components/ColorPalette";
import ColorPaletteFlyout from "./components/ColorPaletteFlyout";
import DragableBoxView from "./components/DragableBox";
import DateTimeText from "./components/DateTimeText";
import DateText from "./components/DateText";
import DialogBase from "./components/DialogBase";
import ConfirmDialog from "./components/ConfirmDialog";
import { ConfirmDialogContent } from "./components/ConfirmDialogContent";
import ElapsedTimeClock from "./components/ElapsedTimeClock";
import VolumeIndicator from "./components/VolumeIndicator";
import ItemWrapGrid from "./components/ItemWrapGrid";
import ContextMenu from "./components/ContextMenu";
import NetworkTester from "./components/NetworkTester";
import AudioOutputTester from "./components/AudioOutputTester";
import AudioTester from "./components/AudioTester";
import FileDropArea from "./components/FileDropArea";
import FileDropAreaCompact from "./components/FileDropAreaCompact";
import SplitView from "./components/SplitView";
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
export { ColorPalette, ColorPaletteFlyout, DragableBoxView, DateTimeText, DateText, ConfirmDialog, ElapsedTimeClock, VolumeIndicator, ConfirmDialogContent, DialogBase, ItemWrapGrid, ContextMenu, NetworkTester, AudioOutputTester, AudioTester, FileDropArea, SplitView, FileDropAreaCompact, DragableBox, Delegate, DeviceInfo, DeviceList, DeviceMediaStreamWrapper, DeviceStreamManager, RtcMediaStreamWrapper, WebRtcConfig, ScreenShareRoom, VideoChatConnection, PeerStream, IDisposeable, getUrlParameter, BrowserType, BrowserUtility, Logger, WebSocketData, WebSocketProvider };
