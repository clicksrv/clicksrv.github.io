import Debug from './Debug';
import currentBrowser from './BrowserDetect';
import VideoAlignmentType from '../../common/enums/VideoAlignmentType.enum';
import StretchType from '../../common/enums/StretchType.enum';
import ExtensionMode from '../../common/enums/ExtensionMode.enum';
import AntiGradientMode from '../../common/enums/AntiGradientMode.enum';
import AspectRatioType from '../../common/enums/AspectRatioType.enum';
import CropModePersistence from '../../common/enums/CropModePersistence.enum';
if (Debug.debug)
    console.log("Loading: ExtensionConf.js");
const ExtensionConf = {
    arDetect: {
        disabledReason: "",
        allowedMisaligned: 0.05,
        // Any more and we don't adjust ar.
        allowedArVariance: 0.075,
        timers: {
            playing: 333,
            paused: 3000,
            error: 3000,
            minimumTimeout: 5,
            tickrate: 10, // 1 tick every this many milliseconds
        },
        autoDisable: {
            maxExecutionTime: 6000,
            // we disable it.
            consecutiveTimeoutCount: 5,
            // FOR FUTURE USE
            consecutiveArResets: 5 // if aspect ratio reverts immediately after AR change is applied, we disable everything
        },
        canvasDimensions: {
            blackframeCanvas: {
                // it's not used to detect aspect ratio by itself, so it can be tiny af
                width: 16,
                height: 9,
            },
            sampleCanvas: {
                // at the expense of performance
                width: 640,
                height: 360,
            },
        },
        // samplingInterval: 10,     // we sample at columns at (width/this) * [ 1 .. this - 1]
        blackframe: {
            sufficientColorVariance: 0.10,
            // component. Average intensity is normalized to where 0 is black and 1 is biggest value for
            // that component. If sum of differences between normalized average intensity and normalized
            // component varies more than this % between color components, we can afford to use less strict
            // cumulative threshold.
            cumulativeThresholdLax: 1600,
            cumulativeThresholdStrict: 2560,
            // (note: blackframe is 16x9 px -> 144px total. cumulative threshold can be reached fast)
            blackPixelsCondition: 0.6, // How much pixels must be black (1 all, 0 none) before we consider frame as black. Takes
            // precedence over cumulative threshold: if blackPixelsCondition is met, the frame is dark
            // regardless of whether cumulative threshold has been reached.
        },
        blackbar: {
            blackLevel: 10,
            // default. blackLevel can decrease if we detect darker black.
            threshold: 16,
            // on 0-255. Needs to be fairly high (8 might not cut it) due to compression
            // artifacts in the video itself
            frameThreshold: 4,
            imageThreshold: 16,
            // the sum of black level, threshold and this value.
            gradientThreshold: 2,
            // the last pixel that's darker than our threshold, and position of the first pixel that's
            // brighter than our image threshold. If positions are more than this many pixels apart,
            // we assume we aren't looking at letterbox and thus don't correct the aspect ratio.
            gradientSampleSize: 16,
            maxGradient: 6,
            // looking at a gradient
            gradientNegativeTreshold: -2,
            gradientMaxSD: 6,
            antiGradientMode: AntiGradientMode.Lax,
        },
        variableBlackbarThresholdOptions: {
            // FOR FUTURE USE
            enabled: true,
            disableArDetectOnMax: true,
            maxBlackbarThreshold: 48,
            thresholdStep: 8,
            increaseAfterConsecutiveResets: 2 // increase if AR resets this many times in a row
        },
        sampling: {
            staticCols: 9,
            randomCols: 0,
            staticRows: 9, // forms grid with staticSampleCols. Determined in the same way. For black frame checks
        },
        guardLine: {
            // (if AR fails to be recalculated, we reset AR)
            enabled: true,
            ignoreEdgeMargin: 0.20,
            // (relative to width of the sample)
            imageTestThreshold: 0.1,
            edgeTolerancePx: 2,
            edgeTolerancePercent: null // unused. same as above, except use % of canvas height instead of pixels
        },
        fallbackMode: {
            enabled: true,
            safetyBorderPx: 5,
            noTriggerZonePx: 8 // if we detect edge less than this many pixels thick, we don't correct.
        },
        arSwitchLimiter: {
            switches: 2,
            period: 2.0 // per this period
        },
        edgeDetection: {
            sampleWidth: 8,
            detectionThreshold: 4,
            confirmationThreshold: 1,
            singleSideConfirmationThreshold: 3,
            // to confirm an edge in case there's no edges on top or bottom (other
            // than logo, of course)
            logoThreshold: 0.15,
            // or watermark.
            edgeTolerancePx: 1,
            edgeTolerancePercent: null,
            middleIgnoredArea: 0.2,
            minColsForSearch: 0.5, // if we hit the edge of blackbars for all but this many columns (%-wise), we don't
            // continue with search. It's pointless, because black edge is higher/lower than we
            // are now. (NOTE: keep this less than 1 in case we implement logo detection)
        },
        pillarTest: {
            ignoreThinPillarsPx: 5,
            allowMisaligned: 0.05 // left and right edge can vary this much (%)
        },
        textLineTest: {
            nonTextPulse: 0.10,
            // with text. This value is relative to canvas width (%)
            pulsesToConfirm: 10,
            pulsesToConfirmIfHalfBlack: 5,
            // is over 50% of the canvas width
            testRowOffset: 0.02 // we test this % of height from detected edge
        }
    },
    zoom: {
        minLogZoom: -1,
        maxLogZoom: 3,
        announceDebounce: 200 // we wait this long before announcing new zoom
    },
    miscSettings: {
        mousePan: {
            enabled: false
        },
        mousePanReverseMouse: false,
    },
    stretch: {
        conditionalDifferencePercent: 0.05 // black bars less than this wide will trigger stretch
        // if mode is set to '1'. 1.0=100%
    },
    resizer: {
        setStyleString: {
            maxRetries: 3,
            retryTimeout: 200
        }
    },
    pageInfo: {
        timeouts: {
            urlCheck: 200,
            rescan: 1500
        }
    },
    // -----------------------------------------
    //             ::: ACTIONS :::
    // -----------------------------------------
    // Nastavitve za ukaze. Zamenja stare nastavitve za bližnične tipke.
    //
    // Polje 'shortcut' je tabela, če se slučajno lotimo kdaj delati choordov.
    actions: [{
            name: 'Trigger automatic detection',
            label: 'Automatic',
            cmd: [{
                    action: 'set-ar',
                    arg: AspectRatioType.Automatic,
                    persistent: false, // optional, false by default. If true, change doesn't take effect immediately.
                    // Instead, this action saves stuff to settings
                }],
            scopes: {
                global: {
                    show: false,
                },
                site: {
                    show: false,
                },
                page: {
                    show: true,
                    label: 'Automatic',
                    shortcut: [{
                            key: 'a',
                            code: 'KeyA',
                            ctrlKey: false,
                            metaKey: false,
                            altKey: false,
                            shiftKey: false,
                            onKeyUp: true,
                            onKeyDown: false,
                        }],
                }
            },
            playerUi: {
                show: true,
                path: 'crop',
            },
        }, {
            name: 'Reset to default',
            label: 'Reset',
            cmd: [{
                    action: 'set-ar',
                    arg: AspectRatioType.Reset,
                }],
            scopes: {
                page: {
                    show: true,
                    shortcut: [{
                            key: 'r',
                            code: 'KeyR',
                            ctrlKey: false,
                            metaKey: false,
                            altKey: false,
                            shiftKey: false,
                            onKeyUp: true,
                            onKeyDown: false,
                        }],
                }
            },
            playerUi: {
                show: true,
                path: 'crop'
            },
        }, {
            name: 'Fit to width',
            label: 'Fit width',
            cmd: [{
                    action: 'set-ar',
                    arg: AspectRatioType.FitWidth,
                }],
            scopes: {
                page: {
                    show: true,
                    shortcut: [{
                            key: 'w',
                            code: 'KeyW',
                            ctrlKey: false,
                            metaKey: false,
                            altKey: false,
                            shiftKey: false,
                            onKeyUp: true,
                            onKeyDown: false,
                        }],
                }
            },
            playerUi: {
                show: true,
                path: 'crop'
            }
        }, {
            name: 'Fit to height',
            label: 'Fit height',
            cmd: [{
                    action: 'set-ar',
                    arg: AspectRatioType.FitHeight
                }],
            scopes: {
                page: {
                    show: true,
                    shortcut: [{
                            key: 'e',
                            code: 'KeyE',
                            ctrlKey: false,
                            metaKey: false,
                            altKey: false,
                            shiftKey: false,
                            onKeyUp: true,
                            onKeyDown: false,
                        }]
                }
            },
            playerUi: {
                show: true,
                path: 'crop'
            }
        }, {
            userAdded: true,
            name: 'Set aspect ratio to 16:9',
            label: '16:9',
            cmd: [{
                    action: 'set-ar',
                    arg: AspectRatioType.Fixed,
                    customArg: 1.78,
                }],
            scopes: {
                page: {
                    show: true,
                    shortcut: [{
                            key: 's',
                            code: 'KeyS',
                            ctrlKey: false,
                            metaKey: false,
                            altKey: false,
                            shiftKey: false,
                            onKeyUp: false,
                            onKeyDown: true,
                        }],
                }
            },
            playerUi: {
                show: true,
                path: 'crop'
            }
        }, {
            userAdded: true,
            name: 'Set aspect ratio to 21:9 (2.39:1)',
            label: '21:9',
            cmd: [{
                    action: 'set-ar',
                    arg: AspectRatioType.Fixed,
                    customArg: 2.39
                }],
            scopes: {
                page: {
                    show: true,
                    shortcut: [{
                            key: 'd',
                            code: 'KeyD',
                            ctrlKey: false,
                            metaKey: false,
                            altKey: false,
                            shiftKey: false,
                            onKeyUp: false,
                            onKeyDown: true,
                        }]
                }
            },
            playerUi: {
                show: true,
                path: 'crop'
            }
        }, {
            userAdded: true,
            name: 'Set aspect ratio to 18:9',
            label: '18:9',
            cmd: [{
                    action: 'set-ar',
                    arg: AspectRatioType.Fixed,
                    customArg: 2.0,
                }],
            scopes: {
                page: {
                    show: true,
                    shortcut: [{
                            key: 'x',
                            code: 'KeyX',
                            ctrlKey: false,
                            metaKey: false,
                            altKey: false,
                            shiftKey: false,
                            onKeyUp: true,
                            onKeyDown: false,
                        }]
                }
            },
            playerUi: {
                show: true,
                path: 'crop',
            }
        }, {
            name: 'Don\'t persist crop',
            label: 'Never persist',
            cmd: [{
                    action: 'set-ar-persistence',
                    arg: CropModePersistence.Disabled,
                }],
            scopes: {
                site: {
                    show: true,
                },
                global: {
                    show: true,
                }
            },
            playerUi: {
                show: true,
            }
        }, {
            name: 'Persist crop while on page',
            label: 'Until page load',
            cmd: [{
                    action: 'set-ar-persistence',
                    arg: CropModePersistence.UntilPageReload,
                }],
            scopes: {
                site: {
                    show: true,
                },
                global: {
                    show: true,
                }
            },
            playerUi: {
                show: true,
            }
        }, {
            name: 'Persist crop for current session',
            label: 'Current session',
            cmd: [{
                    action: 'set-ar-persistence',
                    arg: CropModePersistence.CurrentSession,
                }],
            scopes: {
                site: {
                    show: true,
                },
                global: {
                    show: true,
                }
            },
            playerUi: {
                show: true,
            }
        }, {
            name: 'Persist until manually reset',
            label: 'Always persist',
            cmd: [{
                    action: 'set-ar-persistence',
                    arg: CropModePersistence.Forever,
                }],
            scopes: {
                site: {
                    show: true,
                },
                global: {
                    show: true,
                }
            },
            playerUi: {
                show: true,
            }
        }, {
            name: 'Default crop persistence',
            label: 'Default',
            cmd: [{
                    action: 'set-ar-persistence',
                    arg: CropModePersistence.Default,
                }],
            scopes: {
                site: {
                    show: true,
                },
            },
            playerUi: {
                show: true,
            }
        }, {
            name: 'Zoom in',
            label: 'Zoom',
            cmd: [{
                    action: 'change-zoom',
                    arg: 0.1
                }],
            scopes: {
                page: {
                    show: false,
                    shortcut: [{
                            key: 'z',
                            code: 'KeyY',
                            ctrlKey: false,
                            metaKey: false,
                            altKey: false,
                            shiftKey: false,
                            onKeyUp: true,
                            onKeyDown: false,
                        }],
                }
            },
            playerUi: {
                show: false,
            }
        }, {
            name: 'Zoom out',
            label: 'Unzoom',
            cmd: [{
                    action: 'change-zoom',
                    arg: -0.1
                }],
            scopes: {
                page: {
                    show: false,
                    shortcut: [{
                            key: 'u',
                            code: 'KeyU',
                            ctrlKey: false,
                            metaKey: false,
                            altKey: false,
                            shiftKey: false,
                            onKeyUp: true,
                            onKeyDown: false,
                        }],
                }
            },
            playerUi: {
                show: false
            }
        }, {
            name: 'Toggle panning mode',
            label: 'Toggle pan',
            cmd: [{
                    action: 'toggle-pan',
                    arg: 'toggle'
                }],
            playerUi: {
                show: true,
                path: 'zoom'
            },
            scopes: {}
        }, {
            name: 'Hold to pan',
            cmd: [{
                    action: 'pan',
                    arg: 'toggle',
                }],
            scopes: {
                page: {
                    show: false,
                    shortcut: [{
                            ctrlKey: false,
                            metaKey: false,
                            altKey: false,
                            shiftKey: true,
                            onKeyDown: false,
                            onKeyUp: false,
                            onMouseMove: true,
                        }],
                }
            }
        },
        //
        //   S T R E T C H I N G
        //
        {
            name: 'Set stretch to "none"',
            label: 'Don\'t stretch',
            cmd: [{
                    action: 'set-stretch',
                    arg: StretchType.NoStretch,
                }],
            scopes: {
                global: {
                    show: true,
                    label: 'Normal'
                },
                site: {
                    show: true,
                    label: 'Normal'
                },
                page: {
                    show: true,
                    label: 'Normal'
                }
            },
            playerUi: {
                show: true,
                path: 'stretch'
            }
        }, {
            name: 'Set stretch to "basic"',
            label: 'Basic stretch',
            cmd: [{
                    action: 'set-stretch',
                    arg: StretchType.Basic,
                }],
            scopes: {
                global: {
                    show: true,
                    label: 'Basic'
                },
                site: {
                    show: true,
                    label: 'Basic'
                },
                page: {
                    show: true,
                    label: 'Basic'
                }
            },
            playerUi: {
                show: true,
                path: 'stretch'
            }
        }, {
            name: 'Set stretch to "hybrid"',
            label: 'Hybrid stretch',
            cmd: [{
                    action: 'set-stretch',
                    arg: StretchType.Hybrid,
                }],
            scopes: {
                global: {
                    show: true,
                    label: 'Hybrid'
                },
                site: {
                    show: true,
                    label: 'Hybrid'
                },
                page: {
                    show: true,
                    label: 'Hybrid'
                }
            },
            playerUi: {
                show: true,
                path: 'stretch'
            }
        }, {
            name: 'Stretch only to hide thin borders',
            label: 'Thin borders only',
            cmd: [{
                    action: 'set-stretch',
                    arg: StretchType.Conditional,
                }],
            scopes: {
                global: {
                    show: true,
                    label: 'Thin borders'
                },
                site: {
                    show: true,
                    label: 'Thin borders'
                },
                page: {
                    show: true,
                    label: 'Thin borders'
                }
            },
            playerUi: {
                show: true,
                path: 'stretch'
            }
        }, {
            name: 'Set stretch to default value',
            label: 'Default',
            cmd: [{
                    action: 'set-stretch',
                    arg: StretchType.Default,
                }],
            scopes: {
                site: {
                    show: true,
                }
            }
        },
        {
            name: 'Stretch source to 4:3',
            label: '4:3 stretch (src)',
            cmd: [{
                    action: 'set-stretch',
                    arg: StretchType.FixedSource,
                    customArg: 1.33,
                }],
            scopes: {
                page: {
                    show: true,
                }
            },
            playerUi: {
                show: true,
                path: 'crop'
            }
        }, {
            name: 'Stretch source to 16:9',
            label: '16:9 stretch (src)',
            cmd: [{
                    action: 'set-stretch',
                    arg: StretchType.FixedSource,
                    customArg: 1.77,
                }],
            scopes: {
                page: {
                    show: true,
                }
            },
            playerUi: {
                show: true,
                path: 'crop'
            }
        },
        //
        //    A L I G N M E N T
        //
        {
            name: 'Align video to the left',
            label: 'Left',
            cmd: [{
                    action: 'set-alignment',
                    arg: VideoAlignmentType.Left,
                }],
            scopes: {
                global: {
                    show: true,
                },
                site: {
                    show: true,
                },
                page: {
                    show: true,
                }
            },
            playerUi: {
                show: true,
                path: 'align'
            }
        }, {
            name: 'Align video to center',
            label: 'Center',
            cmd: [{
                    action: 'set-alignment',
                    arg: VideoAlignmentType.Center,
                }],
            scopes: {
                global: {
                    show: true,
                },
                site: {
                    show: true,
                },
                page: {
                    show: true,
                }
            },
            playerUi: {
                show: true,
                path: 'align'
            }
        }, {
            name: 'Align video to the right',
            label: 'Right',
            cmd: [{
                    action: 'set-alignment',
                    arg: VideoAlignmentType.Right
                }],
            scopes: {
                global: {
                    show: true,
                },
                site: {
                    show: true,
                },
                page: {
                    show: true,
                }
            },
            playerUi: {
                show: true,
                path: 'align'
            }
        }, {
            name: 'Use default alignment',
            label: 'Default',
            cmd: [{
                    action: 'set-alignment',
                    arg: VideoAlignmentType.Default
                }],
            scopes: {
                site: {
                    show: true,
                }
            }
        },
        //
        //    E N A B L E   E X T E N S I O N / A U T O A R
        //    (for sites/extension tab in the popup)
        //
        {
            name: 'Enable extension',
            label: 'Enable',
            cmd: [{
                    action: 'set-ExtensionMode',
                    arg: ExtensionMode.Enabled,
                    persistent: true,
                }],
            scopes: {
                global: {
                    show: true,
                },
                site: {
                    show: true,
                }
            }
        }, {
            name: 'Enable extension on whitelisted sites only',
            label: 'On whitelist only',
            cmd: [{
                    action: 'set-ExtensionMode',
                    arg: ExtensionMode.Whitelist,
                    persistent: true,
                }],
            scopes: {
                global: {
                    show: true
                }
            }
        }, {
            name: 'Extension mode: use default settings',
            label: 'Default',
            cmd: [{
                    action: 'set-ExtensionMode',
                    arg: ExtensionMode.Default,
                    persistent: true,
                }],
            scopes: {
                site: {
                    show: true
                }
            }
        }, {
            name: 'Disable extension',
            label: 'Disable',
            cmd: [{
                    action: 'set-ExtensionMode',
                    arg: ExtensionMode.Disabled,
                    persistent: true,
                }],
            scopes: {
                global: {
                    show: true,
                },
                site: {
                    show: true,
                }
            }
        }, {
            name: 'Enable automatic aspect ratio detection',
            label: 'Enable',
            cmd: [{
                    action: 'set-autoar-mode',
                    arg: ExtensionMode.Enabled,
                    persistent: true,
                }],
            scopes: {
                global: {
                    show: true
                },
                site: {
                    show: true
                }
            }
        }, {
            name: 'Enable automatic aspect ratio detection on whitelisted sites only',
            label: 'On whitelist only',
            cmd: [{
                    action: 'set-autoar-mode',
                    arg: ExtensionMode.Whitelist,
                    persistent: true,
                }],
            scopes: {
                global: {
                    show: true,
                }
            }
        }, {
            name: 'Use default settings for automatic aspect ratio detection',
            label: 'Default',
            cmd: [{
                    action: 'set-autoar-mode',
                    arg: ExtensionMode.Default,
                    persistent: true,
                }],
            scopes: {
                site: {
                    show: true,
                }
            }
        }, {
            name: 'Disable automatic aspect ratio detection',
            label: 'Disable',
            cmd: [{
                    action: 'set-autoar-mode',
                    arg: ExtensionMode.Disabled,
                    persistent: true,
                }],
            scopes: {
                global: {
                    show: true,
                },
                site: {
                    show: true,
                }
            }
        },
        //
        //
        // Enable/disable keyboard shortcuts
        //
        {
            name: 'Enable keyboard shortcuts',
            label: 'Enable',
            cmd: [{
                    action: 'set-keyboard',
                    arg: ExtensionMode.Enabled,
                }],
            scopes: {
                global: {
                    show: true,
                },
                site: {
                    show: true,
                },
                page: {
                    show: true,
                }
            }
        }, {
            name: 'Enable keyboard shortcuts on whitelisted sites only',
            label: 'On whitelist only',
            cmd: [{
                    action: 'set-keyboard',
                    arg: ExtensionMode.Whitelist,
                }],
            scopes: {
                global: {
                    show: true
                },
            }
        }, {
            name: 'Keyboard shortcuts mode: use default settings',
            label: 'Default',
            cmd: [{
                    action: 'set-keyboard',
                    arg: ExtensionMode.Default,
                }],
            scopes: {
                site: {
                    show: true
                }
            }
        }, {
            name: 'Disable keyboard shortcuts',
            label: 'Disable',
            cmd: [{
                    action: 'set-keyboard',
                    arg: ExtensionMode.Disabled,
                }],
            scopes: {
                global: {
                    show: true,
                },
                site: {
                    show: true,
                },
                page: {
                    show: true,
                }
            }
        },
    ],
    mitigations: {
        zoomLimit: {
            enabled: true,
            limit: 0.997,
            fullscreenOnly: true
        }
    },
    whatsNewChecked: true,
    // -----------------------------------------
    //       ::: SITE CONFIGURATION :::
    // -----------------------------------------
    // Nastavitve za posamezno stran
    // Config for a given page:
    //
    // <hostname> : {
    //    status: <option>              // should extension work on this site?
    //    arStatus: <option>            // should we do autodetection on this site?
    //
    //    defaultAr?: <ratio>          // automatically apply this aspect ratio on this side. Use extension defaults if undefined.
    //    stretch? <stretch mode>       // automatically stretch video on this site in this manner
    //    videoAlignment? <left|center|right>
    //
    //    type: <official|community|user>  // 'official' — blessed by Tam.
    //                                     // 'community' — blessed by reddit.
    //                                     // 'user' — user-defined (not here)
    //    override: <true|false>           // override user settings for this site on update
    // }
    //
    // Veljavne vrednosti za možnosti
    // Valid values for options:
    //
    //     status, arStatus, statusEmbedded:
    //
    //    * enabled     — always allow, full
    //    * basic       — allow, but only the basic version without playerData
    //    * default     — allow if default is to allow, block if default is to block
    //    * disabled    — never allow
    //
    sites: {
        "@global": {
            // to avoid writing this multiple times. Tags:
            //      #g — only available in @global
            //      #s   — only available for specific site
            mode: ExtensionMode.Enabled,
            //       'enabled'   - work everywhere except blacklist
            //       'whitelist' - only work on whitelisted sites (#g)
            //       'disabled'  - work nowhere
            //       'basic'     - (Possible future use)
            //       'default'   - follow global rules (#s)
            autoar: ExtensionMode.Enabled,
            //  Options: 'enabled', 'whitelist' (#g), 'default' (#s), 'disabled'
            autoarFallback: currentBrowser.firefox ? // if autoAr fails, try fallback mode?
                ExtensionMode.Enabled : // Options same as in autoar.
                ExtensionMode.Disabled,
            stretch: StretchType.NoStretch,
            videoAlignment: VideoAlignmentType.Center,
            keyboardShortcutsEnabled: ExtensionMode.Enabled,
        },
        "www.youtube.com": {
            mode: ExtensionMode.Enabled,
            autoar: ExtensionMode.Enabled,
            autoarFallback: ExtensionMode.Enabled,
            override: false,
            type: 'official',
            actions: null,
            stretch: StretchType.Default,
            videoAlignment: VideoAlignmentType.Default,
            keyboardShortcutsEnabled: ExtensionMode.Default,
            DOM: {
                player: {
                    manual: true,
                    querySelectors: "#movie_player, #player, #c4-player",
                    additionalCss: "",
                    useRelativeAncestor: false,
                    playerNodeCss: "",
                }
            }
        },
        "www.netflix.com": {
            mode: ExtensionMode.Enabled,
            autoar: ExtensionMode.Enabled,
            override: false,
            type: 'official',
            stretch: StretchType.Default,
            videoAlignment: VideoAlignmentType.Default,
            keyboardShortcutsEnabled: ExtensionMode.Default,
            arPersistence: true,
            DOM: {
                player: {
                    manual: false, // as of 2021-09, netflix no longer requires manual player class. This may change in the future tho.
                }
            }
        },
        "www.disneyplus.com": {
            mode: ExtensionMode.Enabled,
            autoar: ExtensionMode.Enabled,
            override: false,
            type: 'community',
            stretch: StretchType.Default,
            videoAlignment: VideoAlignmentType.Default,
            keyboardShortcutsEnabled: ExtensionMode.Default,
            arPersistence: true,
            DOM: {
                "player": {
                    "manual": true,
                    "querySelectors": ".btm-media-client-element",
                    "additionalCss": "",
                    "useRelativeAncestor": false,
                    "videoAncestor": 1,
                    "playerNodeCss": ""
                }
            },
            css: ".hudson-container { height: 100%; }",
        },
        "www.twitch.tv": {
            mode: ExtensionMode.Enabled,
            autoar: ExtensionMode.Enabled,
            override: true,
            type: 'official',
            stretch: StretchType.Default,
            videoAlignment: VideoAlignmentType.Default,
            keyboardShortcutsEnabled: ExtensionMode.Default,
            DOM: {
                player: {
                    manual: false,
                    querySelectors: "",
                    additionalCss: "",
                    useRelativeAncestor: false,
                    playerNodeCss: ""
                }
            }
        },
        "streamable.com": {
            mode: 3,
            autoar: 3,
            type: 'official',
            stretch: -1,
            videoAlignment: -1,
            keyboardShortcutsEnabled: 0,
            css: ".player {text-align: left}"
        },
        "vimeo.com": {
            mode: 3,
            autoar: 3,
            type: 'official',
            stretch: -1,
            videoAlignment: -1,
            keyboardShortcutsEnabled: 0,
            DOM: {
                player: {
                    manual: true,
                    querySelectors: ".player_outro_area",
                    useRelativeAncestor: false,
                },
            },
            css: ".player_outro_area {\n  width: 100% !important;\n  display: flex !important;\n  justify-content: center !important;\n}\n\n.player_container, .player {\n  width: 100% !important; \n}"
        },
        "old.reddit.com": {
            mode: ExtensionMode.Enabled,
            autoar: ExtensionMode.Enabled,
            override: false,
            type: 'testing',
            stretch: StretchType.Default,
            videoAlignment: VideoAlignmentType.Default,
            keyboardShortcutsEnabled: ExtensionMode.Default,
            DOM: {
                player: {
                    manual: false,
                    useRelativeAncestor: false,
                    querySelectors: '.reddit-video-player-root, .media-preview-content'
                }
            },
            css: 'video {\n  width: 100% !important;\n  height: 100% !important;\n}',
        },
        "www.reddit.com": {
            mode: ExtensionMode.Enabled,
            autoar: ExtensionMode.Enabled,
            override: false,
            type: 'testing',
            stretch: StretchType.Default,
            videoAlignment: VideoAlignmentType.Default,
            keyboardShortcutsEnabled: ExtensionMode.Default,
            DOM: {
                player: {
                    manual: false,
                    useRelativeAncestor: false,
                    querySelectors: '.reddit-video-player-root, .media-preview-content'
                }
            },
            css: 'video {\n  width: 100% !important;\n  height: 100% !important;\n}',
        },
        "imgur.com": {
            mode: -1,
            autoar: -1,
            autoarFallback: 0,
            stretch: -1,
            videoAlignment: 1,
            type: 'official',
        },
        "gfycat.com": {
            mode: -1,
            autoar: -1,
            autoarFallback: 0,
            stretch: -1,
            videoAlignment: 1,
            type: 'official,'
        },
        "giant.gfycat.com": {
            mode: -1,
            autoar: -1,
            autoarFallback: 0,
            stretch: -1,
            videoAlignment: 1,
            type: 'official',
        },
        "www.wakanim.tv": {
            type: 'community',
            DOM: {
                player: {
                    manual: true,
                    querySelectors: "#jwplayer-container",
                    additionalCss: "",
                    useRelativeAncestor: false,
                    playerNodeCss: "",
                }
            }
        },
        "app.plex.tv": {
            mode: 3,
            autoar: 3,
            type: "community",
            stretch: -1,
            videoAlignment: -1,
            keyboardShortcutsEnabled: 0,
            DOM: {
                player: {
                    manual: false,
                    querySelectors: "",
                    additionalCss: "",
                    useRelativeAncestor: false,
                    playerNodeCss: ""
                }
            },
            css: "body {\n  background-color: #000;\n}\n\n.application {\n  background-color: #000;\n}"
        },
        "metaivi.com": {
            mode: 0,
            autoar: 0,
            type: "community",
            stretch: -1,
            videoAlignment: -1,
            DOM: {
                video: {
                    manual: false,
                    querySelectors: "",
                    additionalCss: "position: absolute !important;"
                },
                player: {
                    manual: false,
                    querySelectors: "",
                    additionalCss: "",
                    useRelativeAncestor: false,
                    playerNodeCss: ""
                }
            },
            "css": ""
        },
        "piped.kavin.rocks": {
            mode: 0,
            autoar: 0,
            type: 'community',
            autoarFallback: 0,
            stretch: 0,
            videoAlignment: -1,
            keyboardShortcutsEnabled: 0,
            DOM: {
                player: {
                    manual: false,
                    querySelectors: "",
                    additionalCss: "",
                    useRelativeAncestor: false,
                    playerNodeCss: ""
                }
            },
            css: ".shaka-video-container {\n  flex-direction: column !important;\n}"
        },
    }
};
export default ExtensionConf;
