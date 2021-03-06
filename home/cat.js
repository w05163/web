/*! realtimecatjs - v0.2.5 - 2016-02-19 */
!
function(a, b) {
	"function" == typeof define && define.amd ? define([], function() {
		return a.RTCat = b()
	}) : "object" == typeof exports ? module.exports = b() : a.RTCat = b()
}(this, function() {
	var a = a || {};
	a.PeerConnectioin = window.PeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection || window.mozRTCPeerConnection, a.SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription, a.IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate, a.GetUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia, a.URL = window.URL || window.webkitURL || window.msURL || window.oURL, a.isMoz = !! navigator.mozGetUserMedia, a.WSS = "wss://api.realtimecat.com:3000/", a.Poster = {
		md1: "https://shishimao.com/img/video-placeholders/video-placeholder-256x256.png",
		sm2: "https://shishimao.com/img/video-placeholders/video-placeholder-128x256.png",
		lg2: "https://shishimao.com/img/video-placeholders/video-placeholder-512x1024.png",
		md2: "https://shishimao.com/img/video-placeholders/video-placeholder-256x512.png",
		sm1: "https://shishimao.com/img/video-placeholders/video-placeholder-128x128.png",
		lg1: "https://shishimao.com/img/video-placeholders/video-placeholder-512x512.png",
		xl1: "https://shishimao.com/img/video-placeholders/video-placeholder-1024x1024.png",
		xl2: "https://shishimao.com/img/video-placeholders/video-placeholder-1024x2048.png"
	}, a.DISCONNECTED = 0, a.CONNECTING = 1, a.CONNECTED = 2;
	var a = a || {};
	a.Detect = function() {
		function b() {
			var a = "track" in document.createElement("track"),
				b = window.chrome && window.chrome.webstore ? Object.keys(window.chrome.webstore).length : 0,
				c = !! window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
				d = "undefined" != typeof InstallTrigger,
				f = Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0,
				q = !! window.chrome && !c,
				r = !! document.documentMode,
				s = /QQBrowser/.test(navigator.userAgent),
				t = /MetaSr/.test(navigator.userAgent),
				u = e(/^liebao/i, 0),
				v = !1,
				w = !1;
			return a && (b > 1 || (w = !0)), s ? l : u ? o : t ? p : f ? i : d ? j : c ? k : v ? n : w ? m : r ? g : q ? h : 0
		}
		function c() {
			switch (q) {
			case 0:
				return 0;
			case g:
				if (/MSIE ([\d\.]+)/.test(navigator.userAgent)) return parseInt(RegExp.$1);
				break;
			case h:
				if (/Chrome\/([\d]+)\./.test(navigator.userAgent)) return parseInt(RegExp.$1);
				break;
			case i:
				if (/Version\/([\d\.]+)/.test(navigator.userAgent)) return parseInt(RegExp.$1);
				break;
			case j:
				if (/Firefox\/([\d]+)\./.test(navigator.userAgent)) return parseInt(RegExp.$1);
				break;
			case k:
				if (/OPR\/([\d]+)\./.test(navigator.userAgent)) return parseInt(RegExp.$1);
				break;
			case l:
				if (/QQBrowser\/([\d]+)\./.test(navigator.userAgent)) return parseInt(RegExp.$1);
				break;
			default:
				return 0
			}
		}
		function d() {
			var b = {};
			if (a.GetUserMedia && (b.getUserMedia = !0), a.PeerConnectioin && (b.peerConnection = !0), b.peerConnection) {
				var c = new a.PeerConnectioin({
					iceServers: [{
						url: "stun:api.shishimao.com:3478"
					}]
				});
				console.log(c);
				c.createDataChannel && (b.dataChannel = !0)
			}
			return b
		}
		function e(a, b) {
			var c = window.external || {};
			for (var d in c) if (a.test(b ? c[d] : d)) return !0;
			return !1
		}
		var f = this,
			g = 1,
			h = 2,
			i = 3,
			j = 4,
			k = 5,
			l = 6,
			m = 7,
			n = 8,
			o = 9,
			p = 10,
			q = b(),
			r = c(),
			s = d(),
			t = [h, k, l, m, n, p, j];
		f.isSupported = function() {
			for (var a in t) if (q == t[a]) return !0;
			return !1
		}, f.getInputDevices = function(a) {
			try {
				var b = [];
				MediaStreamTrack.getSources(function(c) {
					for (var d = 0; d < c.length; d++) {
						var e = c[d];
						b.push({
							type: e.kind,
							label: e.label,
							id: e.id
						})
					}
					a(null, b)
				})
			} catch (c) {
				a(c)
			}
		}, f.getBrowser = function() {
			var a;
			switch (q) {
			case 0:
				a = "unknown browser";
				break;
			case g:
				a = "IE";
				break;
			case h:
				a = "Chrome";
				break;
			case i:
				a = "Safari";
				break;
			case j:
				a = "Firefox";
				break;
			case k:
				a = "Opera";
				break;
			case n:
				a = "360鏋侀€熸祻瑙堝櫒";
				break;
			case m:
				a = "360瀹夊叏娴忚鍣�";
				break;
			case p:
				a = "鎼滅嫍娴忚鍣�";
				break;
			case o:
				a = "鐚庤惫娴忚鍣�";
				break;
			case l:
				a = "QQ娴忚鍣�";
				break;
			default:
				a = "unknown browser"
			}
			return a
		}, f.getVersion = function() {
			return r
		}, f.WebRtcSupport = function() {
			return s
		}
	};
	var a = a || {};
	a.Errors = function(a, b, c) {
		var d = ["Stream accepts Denied.", "Set RTCat.extensionId before get ScreenSharing.", "Unknown Container!", "The website does not match the extension."],
			e = ["Sending a file once time", "Can not send a message while Channel is close!", "Can not send a file while Channel is close!"],
			f = ["Session has connected", "The type you send is not supported", "Too long for sending"],
			g = [d, e, f];
		this.name = a || "Unknown Error", this.message = g[c][b] || "Sorry, contact with RTCat for more information", this.stack = (new Error).stack
	}, a.Errors.prototype = new Error;
	var a = a || {};
	a.EventEmitter = function() {
		var a = {};
		return a.events = {}, a.onceEvents = {}, a.on = function(b, c) {
			a.events[b] = [], a.events[b].push(c)
		}, a.once = function(b, c) {
			a.onceEvents[b] = [], a.onceEvents[b].push(c)
		}, a.off = function(b) {
			a.events[b] && delete a.events[b]
		}, a.onceOff = function(b) {
			a.onceEvents[b] && delete a.onceEvents[b]
		}, a.emit = function(b, c) {
			var d, e, f = a.onceEvents[b],
				g = Array.prototype.slice.call(arguments, 1);
			if (f) {
				for (d = 0, e = f.length; e > d; d++) f[d].apply(null, g);
				a.onceOff(b)
			} else {
				if (f = a.events[b], !f) return;
				for (d = 0, e = f.length; e > d; d++) f[d].apply(null, g)
			}
		}, a
	};
	var a = a || {};
	a.Receiver = function(b, c) {//接收者，接收流用的b为配置json，c为wss
		function d() {
			function c(b) {
				r.stream = new a.Stream({
					stream: b.stream,
					local: !1
				}), f(i), r.emit("stream", r.stream), r.emit("debug_log", {
					eventName: "receive stream"
				})
			}
			function d(a) {
				r.channel = a.channel, e(r.channel), r.emit("debug_log", {
					eventName: "connect datachannel"
				})
			}
			function g(a) {
				if (a.candidate) {
					var b = {
						to: o,
						channelId: n,
						candidate: a.candidate,
						type: "answer"
					};
					l("__ice", b), b.eventName = "answer send candidate", r.emit("debug_log", b)
				}
			}
			function h() {
				i.createAnswer(function(b) {
					i.setLocalDescription(new a.SessionDescription(b), function() {
						var c = {
							to: o,
							sdp: b,
							channelId: n
						};
						l("__answer", c), c.eventName = "create offer", s = a.CONNECTED, r.emit("debug_log", c)
					}, m)
				}, m, t)
			}
			n = b.channelId, o = b.receiver, r.attr = b.attr;
			var i = new a.PeerConnectioin(b.iceServers);
				console.log(i);

			b.stream && (i.onaddstream = c), b.data && (i.ondatachannel = d), i.oniceconnectionstatechange = function(a) {
				"disconnected" == i.iceConnectionState && (r.close(), r.emit("close"))
			}, i.onicecandidate = g, i.setRemoteDescription(new a.SessionDescription(b.sdp), h, m), r.candidate = function(a) {
				i.addIceCandidate(a), r.emit("debug_log", {
					eventName: "add candidate"
				})
			}, r.close = function() {
				"closed" !== i.signalingState && i.close(), r.channel && r.channel.close(), r.stream && r.stream.stop(), q && (q = {}), s = a.DISCONNECTED, r.emit("close")
			}, r.getId = function() {
				return n
			}, r.getSender = function() {
				return o
			}, r.getState = function() {
				return s
			}, r.getFileList = function() {
				return q
			}, r.getType = function() {
				return p
			}
		}
		function e(a) {
			a.onopen = function() {
				r.emit("dataChannel_open")
			}, a.onclose = function(a) {
				r.emit("dataChannel_close")
			}, a.onmessage = function(a) {
				var b = JSON.parse(a.data);
				if ("message" === b.type) r.emit("message", b.content);
				else if ("video" === b.type);
				else if ("file" === b.type && (q[b.filename] = q[b.filename] || [], q[b.filename].push(b.content), b.last)) {
					var c = {
						blobUrl: q[b.filename].join(""),
						name: b.filename
					};
					c.save = function() {
						var a = document.createElement("a");
						a.href = this.blobUrl, a.target = "_blank", a.download = this.name || this.blobUrl;
						var b = document.createEvent("Event");
						b.initEvent("click", !0, !0), a.dispatchEvent(b), URL.revokeObjectURL(a.href)
					}, r.emit("file", c)
				}
			}, a.onerror = function(a) {
				r.emit("dataChannel_error", a)
			}
		}
		function f(a) {
			console.log(new Date().getSeconds());
			g(a, function(b) {
				for (var c = 0; c < b.length; ++c) {
					var d = b[c];
					"googCandidatePair" == d.type && h(d), "VideoBwe" == d.type && i(d), "ssrc" == d.type && ("0" == d.googCaptureStartNtpTimeMs && k(d), "-1" == d.googCaptureStartNtpTimeMs && j(d))
				}
				setTimeout(function() {
					f(a)
				}, 1e3)
			})
		}
		function g(b, c) {
			a.isMoz || b.getStats(function(a) {
				var b = [];
				a.result().forEach(function(a) {
					var c = {};
					a.names().forEach(function(b) {
						c[b] = a.stat(b)
					}), c.id = a.id, c.type = a.type, c.timestamp = a.timestamp, b.push(c)
				}), c(b)
			})
		}
		function h(a) {
			var b = {};
			r.allReceived || (r.allReceived = a.bytesReceived);
			var c = a.bytesReceived - r.allReceived;
			r.allReceived = a.bytesReceived;
			var d = c / 1024;
			r.allSent || (r.allSent = a.bytesSent);
			var e = a.bytesSent - r.allSent;
			r.allSent = a.bytesSent;
			var f = e / 1024;
			b.received = d, b.sent = f, a.googLocalAddress && (b.local_ip = a.googLocalAddress), a.googRemoteAddress && (b.remote_ip = a.googRemoteAddress), a.googLocalCandidateType && (b.local_candidate_type = a.googLocalCandidateType), a.googRemoteCandidateType && (b.remote_candidate_type = a.googRemoteCandidateType), a.googTransportType && (b.transport_protocol = a.googTransportType), a.googRtt && (b.rtt = a.googRtt), r.emit("detect_net", b)
		}
		function i(a) {
			var b = {};
			a.googAvailableReceiveBandwidth && (b.arb = a.googAvailableReceiveBandwidth), a.googAvailableSendBandwidth && (b.asb = a.googAvailableSendBandwidth), r.emit("detect_video_bw", b)
		}
		function j(a) {
			var b = {};
			r.audioSent || (r.audioSent = a.bytesReceived);
			var c = a.bytesReceived - r.audioSent;
			r.audioSent = a.bytesReceived;
			var d = c / 1024;
			b.received = d.toFixed(1), a.googCurrentDelayMs && (b.delayMs = a.googCurrentDelayMs), a.packetsLost && (b.packetsLost = a.packetsLost), a.googCodecName && (b.codex = a.googCodecName), a.audioOutputLevel && (b.volume_level = a.audioOutputLevel), r.emit("detect_audio", b)
		}
		function k(a) {
			var b = {};
			r.videoSent || (r.videoSent = a.bytesReceived);
			var c = a.bytesReceived - r.videoSent;
			r.videoSent = a.bytesReceived;
			var d = c / 1024;
			b.received = d.toFixed(1), a.googCurrentDelayMs && (b.delayMs = a.googCurrentDelayMs), a.packetsLost && (b.packetsLost = a.packetsLost), a.googDecodeMs && (b.decodeMs = a.googDecodeMs), r.emit("detect_video", b)
		}
		function l(a, b) {
			c.send(JSON.stringify({
				eventName: a,
				data: b
			}))
		}
		function m(a) {
			r.emit("receiver_connect_error", a)
		}
		var n, o, p = "receiver",
			q = {},
			r = new a.EventEmitter,
			s = a.CONNECTING,
			t = {
				optional: [{
					VoiceActivityDetection: !1
				}]
			};
		return d(), r
	};
	var a = a || {};
	a.Sender = function(b, c) {
		function d() {
			function c(a) {
				if (a.candidate) {
					var b = {
						to: r,
						channelId: q,
						candidate: a.candidate,
						type: "offer"
					};
					n("__ice", b), b.eventName = "offer send candidate", u.emit("debug_log", b)
				}
			}
			function d(c) {
				f.setLocalDescription(new a.SessionDescription(c), function() {
					var a = {
						to: r,
						sdp: c,
						channelId: q,
						config: {
							stream: !! b.stream,
							data: b.data,
							attr: b.attr
						}
					};
					n("__offer", a), a.eventName = "create offer", u.emit("debug_log", a)
				}, o)
			}


			
			q = p(), r = b.to, u.attr = b.attr;
			var f = new a.PeerConnectioin(b.iceServers);
				console.log(f);

			f.onicecandidate = c, b.stream && (u.stream = b.stream, f.addStream(b.stream.getStream()), u.emit("debug_log", {
				eventName: "add stream"
			})), b.data && (e(f), u.emit("debug_log", {
				eventName: "add datachannel"
			})), h(f), f.createOffer(d, o, w), u.receive = function(b) {
				f.setRemoteDescription(new a.SessionDescription(b), function() {
					var c = {
						eventName: "receive answer",
						from: r,
						sdp: b
					};
					v = a.CONNECTED, u.emit("debug_log", c)
				}, o)
			}, u.candidate = function(a) {
				f.addIceCandidate(a), u.emit("debug_log", {
					eventName: "add candidate"
				})
			}, u.close = function() {
				"closed" !== f.signalingState && f.close(), u.channel && u.channel.close(), v = a.DISCONNECTED, u.emit("close")
			}, u.getState = function() {
				return v
			}, u.getId = function() {
				return q
			}, u.getReceiver = function() {
				return r
			}, u.getType = function() {
				return s
			}
		}






		function e(a) {
			u.channel = a.createDataChannel("label"), g(u.channel)
		}
		function f() {
			u.sendMessage = function(b) {
				if (v === a.CONNECTED) {
					var c = {
						content: b,
						type: "message"
					};
					u.channel.send(JSON.stringify(c))
				} else u.emit("send_error", new a.Errors("send_error", 1, 1))
			}, u.sendFile = function(b) {
				if (v === a.CONNECTED) if (t) u.emit("file_sending_error", new a.Errors("file_sending_error", 0, 1));
				else {
					t = !0;
					var c, d = new FileReader;
					d.name = b.name, d.readAsDataURL(b), d.onReadAsDataURL = function(a, e) {
						var f = {
							type: "file",
							filename: d.name
						},
							g = 30720;
						if (a && (e = a.target.result, c = e.length), e.length > g) {
							var h = (c - e.length) / c;
							u.emit("file_sending", b.name, h), f.content = e.slice(0, g)
						} else u.emit("file_sent", b.name), t = !1, f.content = e, f.last = !0;
						u.channel.send(JSON.stringify(f));
						var i = e.slice(f.content.length);
						i.length && setTimeout(function() {
							d.onReadAsDataURL(null, i)
						}, 450)
					}, d.onload = d.onReadAsDataURL
				} else u.emit("send_error", new a.Errors("send_error", 1, 2))
			}
		}
		function g(a) {
			a.onopen = function() {
				f(), u.emit("dataChannel_open")
			}, a.onclose = function(a) {
				u.emit("dataChannel_close")
			}, a.onerror = function(a) {
				u.emit("dataChannel_error", a)
			}
		}
		function h(a) {
			i(a, function(b) {
				for (var c = 0; c < b.length; ++c) {
					var d = b[c];
					"googCandidatePair" == d.type && j(d), "VideoBwe" == d.type && k(d), "ssrc" == d.type && (d.googCpuLimitedResolution && m(d), d.audioInputLevel && l(d))
				}
				setTimeout(function() {
					h(a)
				}, 1e3)
			})
		}
		function i(b, c) {
			a.isMoz || b.getStats(function(a) {
				var b = [];
				a.result().forEach(function(a) {
					var c = {};
					a.names().forEach(function(b) {
						c[b] = a.stat(b)
					}), c.id = a.id, c.type = a.type, c.timestamp = a.timestamp, b.push(c)
				}), c(b)
			})
		}
		function j(a) {
			var b = {};
			u.allReceived || (u.allReceived = a.bytesReceived);
			var c = a.bytesReceived - u.allReceived;
			u.allReceived = a.bytesReceived;
			var d = c / 1024;
			u.allSent || (u.allSent = a.bytesSent);
			var e = a.bytesSent - u.allSent;
			u.allSent = a.bytesSent;
			var f = e / 1024;
			b.received = d, b.sent = f, a.googLocalAddress && (b.local_ip = a.googLocalAddress), a.googRemoteAddress && (b.remote_ip = a.googRemoteAddress), a.googLocalCandidateType && (b.local_candidate_type = a.googLocalCandidateType), a.googRemoteCandidateType && (b.remote_candidate_type = a.googRemoteCandidateType), a.googTransportType && (b.transport_protocol = a.googTransportType), a.googRtt && (b.rtt = a.googRtt), u.emit("detect_net", b)
		}
		function k(a) {
			var b = {};
			a.googAvailableReceiveBandwidth && (b.arb = a.googAvailableReceiveBandwidth), a.googAvailableSendBandwidth && (b.asb = a.googAvailableSendBandwidth), u.emit("detect_video_bw", b)
		}
		function l(a) {
			var b = {};
			u.audioSent || (u.audioSent = a.bytesSent);
			var c = a.bytesSent - u.audioSent;
			u.audioSent = a.bytesSent;
			var d = c / 1024;
			b.sent = d.toFixed(1), a.googCodecName && (b.codex = a.googCodecName), a.audioInputLevel && (b.volume_level = a.audioInputLevel), u.emit("detect_audio", b)
		}
		function m(a) {
			var b = {};
			u.videoSent || (u.videoSent = a.bytesSent);
			var c = a.bytesSent - u.videoSent;
			u.videoSent = a.bytesSent;
			var d = c / 1024;
			b.sent = d.toFixed(1), a.googCodecName && (b.codex = a.googCodecName), a.googDecodeMs && (b.decodeMs = a.googDecodeMs), u.emit("detect_video", b)
		}
		function n(a, b) {
			c.send(JSON.stringify({
				eventName: a,
				data: b
			}))
		}
		function o(a) {
			u.emit("sender_connect_error", a)
		}
		function p() {
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
				var b = 16 * Math.random() | 0,
					c = "x" == a ? b : 3 & b | 8;
				return c.toString(16)
			})
		}
		var q, r, s = "sender",
			t = !1,
			u = new a.EventEmitter,
			v = a.CONNECTING,
			w = {
				optional: [{
					VoiceActivityDetection: !1
				}]
			};
		return d(), u
	};
	var a = a || {};
	a.Session = function(b, c) {
		function d() {
			f.onopen = function() {
				l.token = b, h = (new Date).getTime(), f.sendMessage("__join", {
					t: h
				}), m = a.CONNECTED
			}, f.onmessage = function(a) {
				var b = JSON.parse(a.data),
					c = b.eventName,
					d = b.data;
				l.emit(c, d)
			}, f.onerror = function(b) {
				m = a.DISCONNECTED, l.emit("connect_error", b)
			}, f.onclose = function() {
				l.disconnect()
			}, f.sendMessage = function(a, b) {
				f.send(JSON.stringify({
					eventName: a,
					data: b
				}))
			}
		}
		function e(a, b) {
			var c = atob(a),
				d = btoa(b);
			return c.replace(d, "")
		}
		var f, g, h, i = {},
			j = {},
			k = {},
			l = new a.EventEmitter,
			m = a.DISCONNECTED;
		return l.connect = function() {
			m === a.DISCONNECTED ? (c || (c = a.WSS), f = new WebSocket(c, b), d()) : l.emit("connect_error", new a.Errors("connect_error", 0, 3))
		}, l.send = function(b) {
			var c = {
				iceServers: g
			};
			b && "object" == typeof b ? (b.data && (c.data = !0), b.attr && "object" == typeof b.attr && (c.attr = b.attr), b.stream && b.stream.local && (c.stream = b.stream)) : c = {
				data: !0
			};
			for (var d in k) {//对房间内现有的每个用户都创建一个sender
				c.to = d;
				var e = new a.Sender(c, f);
				i[d] = i[d] || {}, i[d][e.getId()] = e
			}
		}, l.sendTo = function(b) {
			if (b && "object" == typeof b && b.to) for (var c in k) if (c == b.to) {
				b.iceServers = g;
				var d = new a.Sender(b, f);
				i[c] = i[c] || {}, i[c][d.getId()] = d;
				break
			}
		}, l.sendMessage = function(b, c) {
			c.length ? c.length < 262144 ? f.sendMessage("__message", {
				message: c,
				socketId: b
			}) : l.emit("send_error", new a.Errors("send_error", 1, 3)) : l.emit("send_error", new a.Errors("send_error", 2, 3))
		}, l.broadcast = function(a) {
			for (var b in k) l.sendMessage(b, a)
		}, l.getState = function() {
			return m
		}, l.getLocal = function() {
			return i
		}, l.getRemote = function() {
			return j
		}, l.getWits = function() {
			return k
		}, l.disconnect = function() {
			if (m = a.DISCONNECTED, j) {
				for (var b in j) for (var c in j[b]) j[b][c].close();
				j = {}
			}
			if (i) {
				for (var d in i) for (var e in i[d]) i[d][e].close();
				i = {}
			}
			k && (k = {}), f.close(), l.emit("disconnected")
		}, l.on("_join", function(b) {
			k[b.socketId] = new a.Token(b.socketId), l.emit("in", k[b.socketId].id)
		}), l.on("_peers", function(b) {
			g = b.iceServer, g.iceServers[0].credential && (g.iceServers[0].credential = e(g.iceServers[0].credential, h));
			var c = b.connections,
				d = [];
			for (var f in c) k[c[f]] = new a.Token(c[f]), d.push(c[f]);
			l.emit("connected", d)
		}), l.on("_remove_peer", function(a) {
			for (var b in i[a.socketId]) {
				var c = i[a.socketId][b];
				c.close()
			}
			for (var d in j[a.socketId]) {
				var e = j[a.socketId][d];
				e.close()
			}
			l.emit("out", k[a.socketId].id), delete k[a.socketId]
		}), l.on("_offer", function(b) {
			var c = b.config;
			c.receiver = b.from, c.sdp = b.sdp, c.channelId = b.channelId, c.iceServers = g;
			var d = new a.Receiver(c, f);
			j[b.from] = j[b.from] || {}, j[b.from][b.channelId] = d, l.emit("remote", d)
		}), l.on("_answer", function(a) {
			var b = i[a.from][a.channelId];
			b.receive(a.sdp), l.emit("local", b)
		}), l.on("_ice", function(b) {
			var c;
			if ("answer" == b.type ? c = i[b.from][b.channelId] : "offer" == b.type && j[b.from] && (c = j[b.from][b.channelId]), c) {
				var d = new a.IceCandidate(b.candidate);
				c.candidate(d)
			}
		}), l.on("_message", function(a) {
			l.emit("message", a.from, a.message)
		}), l.on("_error", function(a) {
			l.emit("channel_error", a.type)
		}), l
	};
	var a = a || {};
	a.Stream = function(b) {
		function c() {
			if ("object" == typeof b) if (void 0 === b.local || b.local === !0) {
				if (b.screen && (q.screen = !0), b.video && !q.screen && (q.video = !0, b.ratio && parseFloat(b.ratio) && (n = parseFloat(b.ratio)), b.fps && parseFloat(b.fps) && (o = parseFloat(b.fps)), b.size && b.size instanceof Array)) for (var a in b.size) if (parseFloat(b.size[a])) switch (a) {
				case 0:
					p.minWidth = parseFloat(b.size[a]);
					break;
				case 1:
					p.minHeight = parseFloat(b.size[a]);
					break;
				case 2:
					p.maxWidth = parseFloat(b.size[a]);
					break;
				case 3:
					p.maxHeight = parseFloat(b.size[a])
				}
				b.audio && !q.screen && (q.audio = !0), q.local = !0, d()
			} else m = b.stream, e()
		}
		function d() {
			q.init = function() {
				q.screen ? f() : (q.video || q.audio) && g()
			}
		}
		function e() {
			function b(b, c) {
				var d = document.createElement("video");
				d.setAttribute("width", c.width), d.setAttribute("height", c.height), d.setAttribute("autoplay", "autoplay"), d.pause(), d.src = a.URL.createObjectURL(m), m.getVideoTracks().length == [] && d.setAttribute("poster", j(c.width, c.height)), q.local && (d.volume = 0, d.muted = 0);
				var e = "";
				e = -1 == b.indexOf("#") && -1 == b.indexOf(".") ? "#" + b : b;
				var f = document.querySelector(e);
				return f ? (f.appendChild(d), d) : void q.emit("play-error", new a.Errors("play-error", 2, 0))
			}
			q.play = function(a, c) {
				if (!s) {
					var d = b(a, k(c));
					d.play(), s = !0, q.player = d
				}
			}, q.stop = function() {
				s && (s = !1, q.player.remove(), delete q.player)
			}, q.resize = function(a) {
				if (s) {
					var b = k(a);
					q.player.width = b.width, q.player.height = b.height
				}
			}, q.hasAudio = function() {
				return m ? m.getAudioTracks() && m.getAudioTracks().length > 0 && m.getAudioTracks()[0].enabled === !0 : !1
			}, q.hasVideo = function() {
				return m ? m.getVideoTracks() && m.getVideoTracks().length > 0 && m.getVideoTracks()[0].enabled === !0 : !1
			}, q.toggleVideo = function() {
				m.getVideoTracks().length > 0 && (m.getVideoTracks()[0].enabled = m.getVideoTracks()[0].enabled === !1)
			}, q.toggleAudio = function() {
				m.getAudioTracks().length > 0 && (m.getAudioTracks()[0].enabled = m.getAudioTracks()[0].enabled === !1)
			}, q.disableVideo = function() {
				m.getVideoTracks().length > 0 && (m.getVideoTracks()[0].enabled = !1)
			}, q.disableAudio = function() {
				m.getAudioTracks().length > 0 && (m.getAudioTracks()[0].enabled = !1)
			}, q.enableVideo = function() {
				m.getVideoTracks().length > 0 && (m.getVideoTracks()[0].enabled = !0)
			}, q.enableAudio = function() {
				m.getAudioTracks().length > 0 && (m.getAudioTracks()[0].enabled = !0)
			}, q.getCapture = function(a, b) {
				if (s) {
					var c = !0;
					if (b.length <= 4 && b.length > 0) for (var d in b)!parseFloat(b[d]) && parseFloat(0 != b[d]) && (c = !1);
					else c = !1;
					c || (b = [0, 0, q.player.width, q.player.height]);
					var e = a.getContext("2d");
					1 == b.length ? e.drawImage(q.player, 0, 0, b[0]) : 2 == b.length ? e.drawImage(q.player, 0, 0, b[0], b[1]) : 3 == b.length ? e.drawImage(q.player, b[0], b[1], b[2]) : 4 == b.length && e.drawImage(q.player, b[0], b[1], b[2], b[3])
				}
			}, q.mute = function() {
				s && !q.local && (q.player.muted = !0)
			}, q.unmute = function() {
				s && !q.local && (q.player.muted = !1)
			}, q.mirror = function() {
				if (s) {
					var a;
					a = r ? 1 : -1, r = !r, ["", "moz", "webkit", "o", "ms"].forEach(function(b) {
						var c = b ? b + "Transform" : "transform";
						q.player.style[c] = "scaleX(" + a + ")"
					})
				}
			}, m.getVideoTracks().length > 0 ? q.screen ? m.getVideoTracks()[0].onended = function() {
				q.emit("screen-end")
			} : q.video && (m.getVideoTracks()[0].onended = function() {
				q.emit("video-end")
			}) : m.getAudioTracks().length > 0 && q.audio && (m.getAudioTracks()[0].onended = function() {
				q.emit("audio-end")
			}), q.getStream = function() {
				return m
			}, q.getShowing = function() {
				return s
			}
		}
		function f() {
			a.extensionId ? chrome.runtime.sendMessage(a.extensionId, {
				getStream: !0
			}, function(b) {
				if (b) {
					var c = b.streamId,
						d = {
							audio: !1,
							video: {
								mandatory: {
									chromeMediaSource: "desktop",
									chromeMediaSourceId: c,
									maxWidth: window.screen.width,
									maxHeight: window.screen.height
								}
							}
						};
					a.GetUserMedia.call(navigator, d, h, i)
				} else q.emit("access-failed", new a.Errors("access-failed", 3, 0))
			}) : q.emit("access-failed", new a.Errors("access-failed", 1, 0))
		}
		function g() {
			var b = {
				audio: q.audio,
				video: {
					mandatory: {},
					optional: []
				}
			};
			n && (b.video.mandatory.minAspectRatio = n), o && (b.video.mandatory.maxFrameRate = o);
			for (var c in p) b.video.mandatory[c] = p[c];
			a.GetUserMedia.call(navigator, b, h, i)
		}
		function h(a) {
			m = a, e(), q.emit("access-accepted")
		}
		function i(b) {
			q.emit("access-failed", new a.Errors("access-failed", 0, 0))
		}
		function j(b, c) {
			var d = "1";
			return b / c > 2 && (d = "2"), 128 > b ? poster_url = a.Poster["sm" + d] : b >= 128 && 256 > b ? poster_url = a.Poster["md" + d] : b >= 256 && 512 > b ? poster_url = a.Poster["lg" + d] : b >= 512 && (poster_url = a.Poster["xl" + d]), poster_url
		}
		function k(a) {
			return "object" == typeof a ? a.width && a.height ? ("string" == typeof a.width && l(a.width) || (parseFloat(a.width) ? a.width = parseFloat(a.width) : a.width = 300), "string" == typeof a.height && l(a.height) || (parseFloat(a.height) ? a.height = parseFloat(a.height) : a.height = 300)) : a.width || a.height ? a.width ? (a.height = "auto", "string" == typeof a.width && l(a.width) || (parseFloat(a.width) ? a.width = parseFloat(a.width) : a.width = 300)) : a.height && (a.width = "auto", "string" == typeof a.height && l(a.height) || (parseFloat(a.height) ? a.height = parseFloat(a.height) : a.height = 300)) : a = {
				width: 300,
				height: 300
			} : a = {
				width: 300,
				height: 300
			}, a
		}
		function l(a) {
			return a.match(/^[0-9]+\.?[0-9]*\%$/) ? !0 : void 0
		}
		var m, n, o, p, q = new a.EventEmitter,
			r = !1,
			s = !1;
		return c(), q
	};
	var a = a || {};
	return a.Token = function(a) {
		var b = this;
		b.id = a
	}, a
});