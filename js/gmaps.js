"use strict";
!(function (e, t) {
  "object" == typeof exports
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(["jquery", "googlemaps!"], t)
    : (e.GMaps = t());
})(this, function () {
  function M(e, t) {
    if (e === t) return e;
    for (var o in t) void 0 !== t[o] && (e[o] = t[o]);
    return e;
  }
  function r(e, o) {
    var t,
      n = Array.prototype.slice.call(arguments, 2),
      i = [],
      r = e.length;
    if (Array.prototype.map && e.map === Array.prototype.map)
      i = Array.prototype.map.call(e, function (e) {
        var t = n.slice(0);
        return t.splice(0, 0, e), o.apply(this, t);
      });
    else
      for (t = 0; t < r; t++)
        (callback_params = n),
          callback_params.splice(0, 0, e[t]),
          i.push(o.apply(this, callback_params));
    return i;
  }
  function s(e) {
    for (var t = [], o = 0; o < e.length; o++) t = t.concat(e[o]);
    return t;
  }
  function x(e, t) {
    var e = e.replace("#", "");
    return (e =
      "jQuery" in window && t ? $("#" + e, t)[0] : document.getElementById(e));
  }
  var C,
    O,
    t,
    o,
    a = function (e, t) {
      for (var o, n, i, r, s = 0; s < e.length; s++)
        e[s] instanceof google.maps.LatLng ||
          (0 < e[s].length && "object" == typeof e[s][0]
            ? (e[s] = a(e[s], t))
            : (e[s] =
                ((o = e[s]),
                (n = t),
                (r = i = void 0),
                (i = o[0]),
                (r = o[1]),
                n && ((i = o[1]), (r = o[0])),
                new google.maps.LatLng(i, r))));
      return e;
    },
    p =
      ((C = document),
      (O = function (o) {
        if ("object" != typeof window.google || !window.google.maps)
          return (
            "object" == typeof window.console &&
              window.console.error &&
              console.error(
                "Google Maps API is required. Please register the following JavaScript library https://maps.googleapis.com/maps/api/js."
              ),
            function () {}
          );
        if (!this) return new O(o);
        (o.zoom = o.zoom || 15), (o.mapType = o.mapType || "roadmap");
        var e,
          t = function (e, t) {
            return void 0 === e ? t : e;
          },
          h = this,
          n = [
            "bounds_changed",
            "center_changed",
            "click",
            "dblclick",
            "drag",
            "dragend",
            "dragstart",
            "idle",
            "maptypeid_changed",
            "projection_changed",
            "resize",
            "tilesloaded",
            "zoom_changed",
          ],
          i = ["mousemove", "mouseout", "mouseover"],
          r = [
            "el",
            "lat",
            "lng",
            "mapType",
            "width",
            "height",
            "markerClusterer",
            "enableNewStyle",
          ],
          s = o.el || o.div,
          a = o.markerClusterer,
          l = google.maps.MapTypeId[o.mapType.toUpperCase()],
          p = new google.maps.LatLng(o.lat, o.lng),
          c = t(o.zoomControl, !0),
          g = o.zoomControlOpt || { style: "DEFAULT", position: "TOP_LEFT" },
          u = g.style || "DEFAULT",
          d = g.position || "TOP_LEFT",
          m = t(o.panControl, !0),
          f = t(o.mapTypeControl, !0),
          g = t(o.scaleControl, !0),
          t = t(o.streetViewControl, !0),
          y = {},
          l = { zoom: this.zoom, center: p, mapTypeId: l },
          t = {
            panControl: m,
            zoomControl: c,
            zoomControlOptions: {
              style: google.maps.ZoomControlStyle[u],
              position: google.maps.ControlPosition[d],
            },
            mapTypeControl: f,
            scaleControl: g,
            streetViewControl: t,
            overviewMapControl: !0,
          };
        if (
          ("string" == typeof o.el || "string" == typeof o.div
            ? -1 < s.indexOf("#")
              ? (this.el = x(s, o.context))
              : (this.el = function (e, t) {
                  var e = e.replace(".", ""),
                    e = (
                      "jQuery" in this && t
                        ? $("." + e, t)
                        : document.getElementsByClassName(e)
                    )[0];
                  return e;
                }.apply(this, [s, o.context]))
            : (this.el = s),
          void 0 === this.el || null === this.el)
        )
          throw "No element defined.";
        for (
          window.context_menu = window.context_menu || {},
            window.context_menu[h.el.id] = {},
            this.controls = [],
            this.overlays = [],
            this.layers = [],
            this.singleLayers = {},
            this.markers = [],
            this.polylines = [],
            this.routes = [],
            this.polygons = [],
            this.infoWindow = null,
            this.overlay_el = null,
            this.zoom = o.zoom,
            this.registered_events = {},
            this.el.style.width =
              o.width || this.el.scrollWidth || this.el.offsetWidth,
            this.el.style.height =
              o.height || this.el.scrollHeight || this.el.offsetHeight,
            google.maps.visualRefresh = o.enableNewStyle,
            e = 0;
          e < r.length;
          e++
        )
          delete o[r[e]];
        for (
          1 != o.disableDefaultUI && (l = M(l, t)), y = M(l, o), e = 0;
          e < n.length;
          e++
        )
          delete y[n[e]];
        for (e = 0; e < i.length; e++) delete y[i[e]];
        (this.map = new google.maps.Map(this.el, y)),
          a && (this.markerClusterer = a.apply(this, [this.map]));
        function v(t, o) {
          var e,
            n = "",
            i = window.context_menu[h.el.id][t];
          for (s in i)
            i.hasOwnProperty(s) &&
              ((e = i[s]),
              (n +=
                '<li><a id="' +
                t +
                "_" +
                s +
                '" href="#">' +
                e.title +
                "</a></li>"));
          if (x("gmaps_context_menu")) {
            var r = x("gmaps_context_menu");
            r.innerHTML = n;
            var s,
              a = r.getElementsByTagName("a"),
              l = a.length;
            for (s = 0; s < l; s++) {
              var p = a[s];
              google.maps.event.clearListeners(p, "click"),
                google.maps.event.addDomListenerOnce(
                  p,
                  "click",
                  function (e) {
                    e.preventDefault(),
                      i[this.id.replace(t + "_", "")].action.apply(h, [o]),
                      h.hideContextMenu();
                  },
                  !1
                );
            }
            var c = function (e) {
                var t = 0,
                  o = 0;
                if (e.getBoundingClientRect) {
                  var n = e.getBoundingClientRect(),
                    i = -(window.scrollX || window.pageXOffset),
                    r = -(window.scrollY || window.pageYOffset);
                  return [n.left - i, n.top - r];
                }
                if (e.offsetParent)
                  for (
                    ;
                    (t += e.offsetLeft),
                      (o += e.offsetTop),
                      (e = e.offsetParent);

                  );
                return [t, o];
              }.apply(this, [h.el]),
              g = c[0] + o.pixel.x - 15,
              c = c[1] + o.pixel.y - 15;
            (r.style.left = g + "px"), (r.style.top = c + "px");
          }
        }
        (this.buildContextMenu = function (o, n) {
          var i;
          "marker" === o
            ? ((n.pixel = {}),
              (i = new google.maps.OverlayView()).setMap(h.map),
              (i.draw = function () {
                var e = i.getProjection(),
                  t = n.marker.getPosition();
                (n.pixel = e.fromLatLngToContainerPixel(t)), v(o, n);
              }))
            : v(o, n);
          var e = x("gmaps_context_menu");
          setTimeout(function () {
            e.style.display = "block";
          }, 0);
        }),
          (this.setContextMenu = function (e) {
            window.context_menu[h.el.id][e.control] = {};
            var t,
              o,
              n = C.createElement("ul");
            for (t in e.options)
              e.options.hasOwnProperty(t) &&
                ((o = e.options[t]),
                (window.context_menu[h.el.id][e.control][o.name] = {
                  title: o.title,
                  action: o.action,
                }));
            (n.id = "gmaps_context_menu"),
              (n.style.display = "none"),
              (n.style.position = "absolute"),
              (n.style.minWidth = "100px"),
              (n.style.background = "white"),
              (n.style.listStyle = "none"),
              (n.style.padding = "8px"),
              (n.style.boxShadow = "2px 2px 6px #ccc"),
              x("gmaps_context_menu") || C.body.appendChild(n);
            var i = x("gmaps_context_menu");
            google.maps.event.addDomListener(
              i,
              "mouseout",
              function (e) {
                (e.relatedTarget && this.contains(e.relatedTarget)) ||
                  window.setTimeout(function () {
                    i.style.display = "none";
                  }, 400);
              },
              !1
            );
          }),
          (this.hideContextMenu = function () {
            var e = x("gmaps_context_menu");
            e && (e.style.display = "none");
          });
        function w(e, t) {
          google.maps.event.addListener(e, t, function (e) {
            null == e && (e = this), o[t].apply(this, [e]), h.hideContextMenu();
          });
        }
        google.maps.event.addListener(
          this.map,
          "zoom_changed",
          this.hideContextMenu
        );
        for (var k = 0; k < n.length; k++) (L = n[k]) in o && w(this.map, L);
        for (var L, k = 0; k < i.length; k++) (L = i[k]) in o && w(this.map, L);
        google.maps.event.addListener(this.map, "rightclick", function (e) {
          o.rightclick && o.rightclick.apply(this, [e]),
            null != window.context_menu[h.el.id].map &&
              h.buildContextMenu("map", e);
        }),
          (this.refresh = function () {
            google.maps.event.trigger(this.map, "resize");
          }),
          (this.fitZoom = function () {
            for (var e = [], t = this.markers.length, o = 0; o < t; o++)
              "boolean" == typeof this.markers[o].visible &&
                this.markers[o].visible &&
                e.push(this.markers[o].getPosition());
            this.fitLatLngBounds(e);
          }),
          (this.fitLatLngBounds = function (e) {
            for (
              var t = e.length, o = new google.maps.LatLngBounds(), n = 0;
              n < t;
              n++
            )
              o.extend(e[n]);
            this.map.fitBounds(o);
          }),
          (this.setCenter = function (e, t, o) {
            this.map.panTo(new google.maps.LatLng(e, t)), o && o();
          }),
          (this.getElement = function () {
            return this.el;
          }),
          (this.zoomIn = function (e) {
            (e = e || 1),
              (this.zoom = this.map.getZoom() + e),
              this.map.setZoom(this.zoom);
          }),
          (this.zoomOut = function (e) {
            (e = e || 1),
              (this.zoom = this.map.getZoom() - e),
              this.map.setZoom(this.zoom);
          });
        var b,
          _ = [];
        for (b in this.map)
          "function" != typeof this.map[b] || this[b] || _.push(b);
        for (e = 0; e < _.length; e++)
          !(function (e, t, o) {
            e[o] = function () {
              return t[o].apply(t, arguments);
            };
          })(this, this.map, _[e]);
      }));
  return (
    (p.prototype.createControl = function (t) {
      var e,
        o,
        n = document.createElement("div");
      for (e in ((n.style.cursor = "pointer"),
      !0 !== t.disableDefaultStyles &&
        ((n.style.fontFamily = "Roboto, Arial, sans-serif"),
        (n.style.fontSize = "11px"),
        (n.style.boxShadow = "rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px")),
      t.style))
        n.style[e] = t.style[e];
      for (o in (t.id && (n.id = t.id),
      t.title && (n.title = t.title),
      t.classes && (n.className = t.classes),
      t.content &&
        ("string" == typeof t.content
          ? (n.innerHTML = t.content)
          : t.content instanceof HTMLElement && n.appendChild(t.content)),
      t.position &&
        (n.position = google.maps.ControlPosition[t.position.toUpperCase()]),
      t.events))
        !(function (e) {
          google.maps.event.addDomListener(n, e, function () {
            t.events[e].apply(this, [this]);
          });
        })(o);
      return (n.index = 1), n;
    }),
    (p.prototype.addControl = function (e) {
      e = this.createControl(e);
      return this.controls.push(e), this.map.controls[e.position].push(e), e;
    }),
    (p.prototype.removeControl = function (e) {
      for (var t = null, o = 0; o < this.controls.length; o++)
        this.controls[o] == e &&
          ((t = this.controls[o].position), this.controls.splice(o, 1));
      if (t)
        for (o = 0; o < this.map.controls.length; o++) {
          var n = this.map.controls[e.position];
          if (n.getAt(o) == e) {
            n.removeAt(o);
            break;
          }
        }
      return e;
    }),
    (p.prototype.createMarker = function (n) {
      if (null == n.lat && null == n.lng && null == n.position)
        throw "No latitude or longitude defined.";
      var t = this,
        e = n.details,
        o = n.fences,
        i = n.outside,
        r = { position: new google.maps.LatLng(n.lat, n.lng), map: null },
        r = M(r, n);
      delete r.lat, delete r.lng, delete r.fences, delete r.outside;
      var s = new google.maps.Marker(r);
      if (((s.fences = o), n.infoWindow)) {
        s.infoWindow = new google.maps.InfoWindow(n.infoWindow);
        for (
          var a = [
              "closeclick",
              "content_changed",
              "domready",
              "position_changed",
              "zindex_changed",
            ],
            l = 0;
          l < a.length;
          l++
        )
          !(function (e, t) {
            n.infoWindow[t] &&
              google.maps.event.addListener(e, t, function (e) {
                n.infoWindow[t].apply(this, [e]);
              });
          })(s.infoWindow, a[l]);
      }
      for (
        var p = [
            "animation_changed",
            "clickable_changed",
            "cursor_changed",
            "draggable_changed",
            "flat_changed",
            "icon_changed",
            "position_changed",
            "shadow_changed",
            "shape_changed",
            "title_changed",
            "visible_changed",
            "zindex_changed",
          ],
          c = [
            "dblclick",
            "drag",
            "dragend",
            "dragstart",
            "mousedown",
            "mouseout",
            "mouseover",
            "mouseup",
          ],
          l = 0;
        l < p.length;
        l++
      )
        !(function (e) {
          n[e] &&
            google.maps.event.addListener(s, e, function () {
              n[e].apply(this, [this]);
            });
        })(p[l]);
      for (l = 0; l < c.length; l++)
        !(function (t, o) {
          n[o] &&
            google.maps.event.addListener(s, o, function (e) {
              e.pixel ||
                (e.pixel = t.getProjection().fromLatLngToPoint(e.latLng)),
                n[o].apply(this, [e]);
            });
        })(this.map, c[l]);
      return (
        google.maps.event.addListener(s, "click", function () {
          (this.details = e),
            n.click && n.click.apply(this, [this]),
            s.infoWindow && (t.hideInfoWindows(), s.infoWindow.open(t.map, s));
        }),
        google.maps.event.addListener(s, "rightclick", function (e) {
          (e.marker = this),
            n.rightclick && n.rightclick.apply(this, [e]),
            null != window.context_menu[t.el.id].marker &&
              t.buildContextMenu("marker", e);
        }),
        s.fences &&
          google.maps.event.addListener(s, "dragend", function () {
            t.checkMarkerGeofence(s, function (e, t) {
              i(e, t);
            });
          }),
        s
      );
    }),
    (p.prototype.addMarker = function (e) {
      var t;
      if (e.hasOwnProperty("gm_accessors_")) t = e;
      else {
        if (
          !((e.hasOwnProperty("lat") && e.hasOwnProperty("lng")) || e.position)
        )
          throw "No latitude or longitude defined.";
        t = this.createMarker(e);
      }
      return (
        t.setMap(this.map),
        this.markerClusterer && this.markerClusterer.addMarker(t),
        this.markers.push(t),
        p.fire("marker_added", t, this),
        t
      );
    }),
    (p.prototype.addMarkers = function (e) {
      for (var t, o = 0; (t = e[o]); o++) this.addMarker(t);
      return this.markers;
    }),
    (p.prototype.hideInfoWindows = function () {
      for (var e, t = 0; (e = this.markers[t]); t++)
        e.infoWindow && e.infoWindow.close();
    }),
    (p.prototype.removeMarker = function (e) {
      for (var t = 0; t < this.markers.length; t++)
        if (this.markers[t] === e) {
          this.markers[t].setMap(null),
            this.markers.splice(t, 1),
            this.markerClusterer && this.markerClusterer.removeMarker(e),
            p.fire("marker_removed", e, this);
          break;
        }
      return e;
    }),
    (p.prototype.removeMarkers = function (e) {
      var t = [];
      if (void 0 === e) {
        for (var o = 0; o < this.markers.length; o++)
          (i = this.markers[o]).setMap(null), p.fire("marker_removed", i, this);
        this.markerClusterer &&
          this.markerClusterer.clearMarkers &&
          this.markerClusterer.clearMarkers(),
          (this.markers = t);
      } else {
        for (o = 0; o < e.length; o++) {
          var n = this.markers.indexOf(e[o]);
          -1 < n &&
            ((i = this.markers[n]).setMap(null),
            this.markerClusterer && this.markerClusterer.removeMarker(i),
            p.fire("marker_removed", i, this));
        }
        for (var i, o = 0; o < this.markers.length; o++)
          null != (i = this.markers[o]).getMap() && t.push(i);
        this.markers = t;
      }
    }),
    (p.prototype.drawOverlay = function (r) {
      var s = new google.maps.OverlayView(),
        a = !0;
      return (
        s.setMap(this.map),
        null != r.auto_show && (a = r.auto_show),
        (s.onAdd = function () {
          var e = document.createElement("div");
          (e.style.borderStyle = "none"),
            (e.style.borderWidth = "0px"),
            (e.style.position = "absolute"),
            (e.style.zIndex = 100),
            (e.innerHTML = r.content),
            (s.el = e),
            r.layer || (r.layer = "overlayLayer");
          var t = this.getPanes(),
            o = ["contextmenu", "DOMMouseScroll", "dblclick", "mousedown"];
          t[r.layer].appendChild(e);
          for (var n, i = 0; i < o.length; i++)
            (n = o[i]),
              google.maps.event.addDomListener(e, n, function (e) {
                -1 != navigator.userAgent.toLowerCase().indexOf("msie") &&
                document.all
                  ? ((e.cancelBubble = !0), (e.returnValue = !1))
                  : e.stopPropagation();
              });
          r.click &&
            (t.overlayMouseTarget.appendChild(s.el),
            google.maps.event.addDomListener(s.el, "click", function () {
              r.click.apply(s, [s]);
            })),
            google.maps.event.trigger(this, "ready");
        }),
        (s.draw = function () {
          var e = this.getProjection().fromLatLngToDivPixel(
            new google.maps.LatLng(r.lat, r.lng)
          );
          (r.horizontalOffset = r.horizontalOffset || 0),
            (r.verticalOffset = r.verticalOffset || 0);
          var t = s.el,
            o = t.children[0],
            n = o.clientHeight,
            i = o.clientWidth;
          switch (r.verticalAlign) {
            case "top":
              t.style.top = e.y - n + r.verticalOffset + "px";
              break;
            default:
            case "middle":
              t.style.top = e.y - n / 2 + r.verticalOffset + "px";
              break;
            case "bottom":
              t.style.top = e.y + r.verticalOffset + "px";
          }
          switch (r.horizontalAlign) {
            case "left":
              t.style.left = e.x - i + r.horizontalOffset + "px";
              break;
            default:
            case "center":
              t.style.left = e.x - i / 2 + r.horizontalOffset + "px";
              break;
            case "right":
              t.style.left = e.x + r.horizontalOffset + "px";
          }
          (t.style.display = a ? "block" : "none"),
            a || r.show.apply(this, [t]);
        }),
        (s.onRemove = function () {
          var e = s.el;
          r.remove
            ? r.remove.apply(this, [e])
            : (s.el.parentNode.removeChild(s.el), (s.el = null));
        }),
        this.overlays.push(s),
        s
      );
    }),
    (p.prototype.removeOverlay = function (e) {
      for (var t = 0; t < this.overlays.length; t++)
        if (this.overlays[t] === e) {
          this.overlays[t].setMap(null), this.overlays.splice(t, 1);
          break;
        }
    }),
    (p.prototype.removeOverlays = function () {
      for (var e, t = 0; (e = this.overlays[t]); t++) e.setMap(null);
      this.overlays = [];
    }),
    (p.prototype.drawPolyline = function (o) {
      var e = [],
        t = o.path;
      if (t.length)
        if (void 0 === t[0][0]) e = t;
        else
          for (var n, i = 0; (n = t[i]); i++)
            e.push(new google.maps.LatLng(n[0], n[1]));
      var r = {
        map: this.map,
        path: e,
        strokeColor: o.strokeColor,
        strokeOpacity: o.strokeOpacity,
        strokeWeight: o.strokeWeight,
        geodesic: o.geodesic,
        clickable: !0,
        editable: !1,
        visible: !0,
      };
      o.hasOwnProperty("clickable") && (r.clickable = o.clickable),
        o.hasOwnProperty("editable") && (r.editable = o.editable),
        o.hasOwnProperty("icons") && (r.icons = o.icons),
        o.hasOwnProperty("zIndex") && (r.zIndex = o.zIndex);
      for (
        var s = new google.maps.Polyline(r),
          a = [
            "click",
            "dblclick",
            "mousedown",
            "mousemove",
            "mouseout",
            "mouseover",
            "mouseup",
            "rightclick",
          ],
          l = 0;
        l < a.length;
        l++
      )
        !(function (t) {
          o[t] &&
            google.maps.event.addListener(s, t, function (e) {
              o[t].apply(this, [e]);
            });
        })(a[l]);
      return this.polylines.push(s), p.fire("polyline_added", s, this), s;
    }),
    (p.prototype.removePolyline = function (e) {
      for (var t = 0; t < this.polylines.length; t++)
        if (this.polylines[t] === e) {
          this.polylines[t].setMap(null),
            this.polylines.splice(t, 1),
            p.fire("polyline_removed", e, this);
          break;
        }
    }),
    (p.prototype.removePolylines = function () {
      for (var e, t = 0; (e = this.polylines[t]); t++) e.setMap(null);
      this.polylines = [];
    }),
    (p.prototype.drawCircle = function (o) {
      delete (o = M(
        { map: this.map, center: new google.maps.LatLng(o.lat, o.lng) },
        o
      )).lat,
        delete o.lng;
      for (
        var e = new google.maps.Circle(o),
          t = [
            "click",
            "dblclick",
            "mousedown",
            "mousemove",
            "mouseout",
            "mouseover",
            "mouseup",
            "rightclick",
          ],
          n = 0;
        n < t.length;
        n++
      )
        !(function (t) {
          o[t] &&
            google.maps.event.addListener(e, t, function (e) {
              o[t].apply(this, [e]);
            });
        })(t[n]);
      return this.polygons.push(e), e;
    }),
    (p.prototype.drawRectangle = function (o) {
      o = M({ map: this.map }, o);
      var e = new google.maps.LatLngBounds(
        new google.maps.LatLng(o.bounds[0][0], o.bounds[0][1]),
        new google.maps.LatLng(o.bounds[1][0], o.bounds[1][1])
      );
      o.bounds = e;
      for (
        var n = new google.maps.Rectangle(o),
          t = [
            "click",
            "dblclick",
            "mousedown",
            "mousemove",
            "mouseout",
            "mouseover",
            "mouseup",
            "rightclick",
          ],
          i = 0;
        i < t.length;
        i++
      )
        !(function (t) {
          o[t] &&
            google.maps.event.addListener(n, t, function (e) {
              o[t].apply(this, [e]);
            });
        })(t[i]);
      return this.polygons.push(n), n;
    }),
    (p.prototype.drawPolygon = function (o) {
      var e = !1;
      o.hasOwnProperty("useGeoJSON") && (e = o.useGeoJSON),
        delete o.useGeoJSON,
        (o = M({ map: this.map }, o)),
        0 == e && (o.paths = [o.paths.slice(0)]),
        0 < o.paths.length &&
          0 < o.paths[0].length &&
          (o.paths = s(r(o.paths, a, e)));
      for (
        var n = new google.maps.Polygon(o),
          t = [
            "click",
            "dblclick",
            "mousedown",
            "mousemove",
            "mouseout",
            "mouseover",
            "mouseup",
            "rightclick",
          ],
          i = 0;
        i < t.length;
        i++
      )
        !(function (t) {
          o[t] &&
            google.maps.event.addListener(n, t, function (e) {
              o[t].apply(this, [e]);
            });
        })(t[i]);
      return this.polygons.push(n), p.fire("polygon_added", n, this), n;
    }),
    (p.prototype.removePolygon = function (e) {
      for (var t = 0; t < this.polygons.length; t++)
        if (this.polygons[t] === e) {
          this.polygons[t].setMap(null),
            this.polygons.splice(t, 1),
            p.fire("polygon_removed", e, this);
          break;
        }
    }),
    (p.prototype.removePolygons = function () {
      for (var e, t = 0; (e = this.polygons[t]); t++) e.setMap(null);
      this.polygons = [];
    }),
    (p.prototype.getFromFusionTables = function (e) {
      var o = e.events;
      delete e.events;
      var t,
        n = new google.maps.FusionTablesLayer(e);
      for (t in o)
        !(function (t) {
          google.maps.event.addListener(n, t, function (e) {
            o[t].apply(this, [e]);
          });
        })(t);
      return this.layers.push(n), n;
    }),
    (p.prototype.loadFromFusionTables = function (e) {
      e = this.getFromFusionTables(e);
      return e.setMap(this.map), e;
    }),
    (p.prototype.getFromKML = function (e) {
      var t = e.url,
        o = e.events;
      delete e.url, delete e.events;
      var n,
        i = new google.maps.KmlLayer(t, e);
      for (n in o)
        !(function (t) {
          google.maps.event.addListener(i, t, function (e) {
            o[t].apply(this, [e]);
          });
        })(n);
      return this.layers.push(i), i;
    }),
    (p.prototype.loadFromKML = function (e) {
      e = this.getFromKML(e);
      return e.setMap(this.map), e;
    }),
    (p.prototype.addLayer = function (e, t) {
      var o, n;
      switch (((t = t || {}), e)) {
        case "weather":
          this.singleLayers.weather = o =
            new google.maps.weather.WeatherLayer();
          break;
        case "clouds":
          this.singleLayers.clouds = o = new google.maps.weather.CloudLayer();
          break;
        case "traffic":
          this.singleLayers.traffic = o = new google.maps.TrafficLayer();
          break;
        case "transit":
          this.singleLayers.transit = o = new google.maps.TransitLayer();
          break;
        case "bicycling":
          this.singleLayers.bicycling = o = new google.maps.BicyclingLayer();
          break;
        case "panoramio":
          (this.singleLayers.panoramio = o =
            new google.maps.panoramio.PanoramioLayer()),
            o.setTag(t.filter),
            delete t.filter,
            t.click &&
              google.maps.event.addListener(o, "click", function (e) {
                t.click(e), delete t.click;
              });
          break;
        case "places":
          (this.singleLayers.places = o =
            new google.maps.places.PlacesService(this.map)),
            (t.search || t.nearbySearch || t.radarSearch) &&
              ((n = {
                bounds: t.bounds || null,
                keyword: t.keyword || null,
                location: t.location || null,
                name: t.name || null,
                radius: t.radius || null,
                rankBy: t.rankBy || null,
                types: t.types || null,
              }),
              t.radarSearch && o.radarSearch(n, t.radarSearch),
              t.search && o.search(n, t.search),
              t.nearbySearch && o.nearbySearch(n, t.nearbySearch)),
            t.textSearch &&
              ((n = {
                bounds: t.bounds || null,
                location: t.location || null,
                query: t.query || null,
                radius: t.radius || null,
              }),
              o.textSearch(n, t.textSearch));
      }
      if (void 0 !== o)
        return (
          "function" == typeof o.setOptions && o.setOptions(t),
          "function" == typeof o.setMap && o.setMap(this.map),
          o
        );
    }),
    (p.prototype.removeLayer = function (e) {
      if ("string" == typeof e && void 0 !== this.singleLayers[e])
        this.singleLayers[e].setMap(null), delete this.singleLayers[e];
      else
        for (var t = 0; t < this.layers.length; t++)
          if (this.layers[t] === e) {
            this.layers[t].setMap(null), this.layers.splice(t, 1);
            break;
          }
    }),
    (p.prototype.getRoutes = function (n) {
      switch (n.travelMode) {
        case "bicycling":
          t = google.maps.TravelMode.BICYCLING;
          break;
        case "transit":
          t = google.maps.TravelMode.TRANSIT;
          break;
        case "driving":
          t = google.maps.TravelMode.DRIVING;
          break;
        default:
          t = google.maps.TravelMode.WALKING;
      }
      o =
        "imperial" === n.unitSystem
          ? google.maps.UnitSystem.IMPERIAL
          : google.maps.UnitSystem.METRIC;
      var e = M(
        {
          avoidHighways: !1,
          avoidTolls: !1,
          optimizeWaypoints: !1,
          waypoints: [],
        },
        n
      );
      (e.origin = /string/.test(typeof n.origin)
        ? n.origin
        : new google.maps.LatLng(n.origin[0], n.origin[1])),
        (e.destination = /string/.test(typeof n.destination)
          ? n.destination
          : new google.maps.LatLng(n.destination[0], n.destination[1])),
        (e.travelMode = t),
        (e.unitSystem = o),
        delete e.callback,
        delete e.error;
      var i = [];
      new google.maps.DirectionsService().route(e, function (e, t) {
        if (t === google.maps.DirectionsStatus.OK) {
          for (var o in e.routes)
            e.routes.hasOwnProperty(o) && i.push(e.routes[o]);
          n.callback && n.callback(i, e, t);
        } else n.error && n.error(e, t);
      });
    }),
    (p.prototype.removeRoutes = function () {
      this.routes.length = 0;
    }),
    (p.prototype.getElevations = function (e) {
      0 <
        (e = M({ locations: [], path: !1, samples: 256 }, e)).locations
          .length &&
        0 < e.locations[0].length &&
        (e.locations = s(r([e.locations], a, !1)));
      var o = e.callback;
      delete e.callback;
      var t,
        n = new google.maps.ElevationService();
      e.path
        ? ((t = { path: e.locations, samples: e.samples }),
          n.getElevationAlongPath(t, function (e, t) {
            o && "function" == typeof o && o(e, t);
          }))
        : (delete e.path,
          delete e.samples,
          n.getElevationForLocations(e, function (e, t) {
            o && "function" == typeof o && o(e, t);
          }));
    }),
    (p.prototype.cleanRoute = p.prototype.removePolylines),
    (p.prototype.renderRoute = function (e, t) {
      var n,
        o =
          "string" == typeof t.panel
            ? document.getElementById(t.panel.replace("#", ""))
            : t.panel;
      (t.panel = o),
        (t = M({ map: this.map }, t)),
        (n = new google.maps.DirectionsRenderer(t)),
        this.getRoutes({
          origin: e.origin,
          destination: e.destination,
          travelMode: e.travelMode,
          waypoints: e.waypoints,
          unitSystem: e.unitSystem,
          error: e.error,
          avoidHighways: e.avoidHighways,
          avoidTolls: e.avoidTolls,
          optimizeWaypoints: e.optimizeWaypoints,
          callback: function (e, t, o) {
            o === google.maps.DirectionsStatus.OK && n.setDirections(t);
          },
        });
    }),
    (p.prototype.drawRoute = function (o) {
      var n = this;
      this.getRoutes({
        origin: o.origin,
        destination: o.destination,
        travelMode: o.travelMode,
        waypoints: o.waypoints,
        unitSystem: o.unitSystem,
        error: o.error,
        avoidHighways: o.avoidHighways,
        avoidTolls: o.avoidTolls,
        optimizeWaypoints: o.optimizeWaypoints,
        callback: function (e) {
          var t;
          0 < e.length &&
            ((t = {
              path: e[e.length - 1].overview_path,
              strokeColor: o.strokeColor,
              strokeOpacity: o.strokeOpacity,
              strokeWeight: o.strokeWeight,
            }),
            o.hasOwnProperty("icons") && (t.icons = o.icons),
            n.drawPolyline(t),
            o.callback && o.callback(e[e.length - 1]));
        },
      });
    }),
    (p.prototype.travelRoute = function (r) {
      if (r.origin && r.destination)
        this.getRoutes({
          origin: r.origin,
          destination: r.destination,
          travelMode: r.travelMode,
          waypoints: r.waypoints,
          unitSystem: r.unitSystem,
          error: r.error,
          callback: function (e) {
            if (
              (0 < e.length && r.start && r.start(e[e.length - 1]),
              0 < e.length && r.step)
            ) {
              var t = e[e.length - 1];
              if (0 < t.legs.length)
                for (var o, n = t.legs[0].steps, i = 0; (o = n[i]); i++)
                  (o.step_number = i), r.step(o, t.legs[0].steps.length - 1);
            }
            0 < e.length && r.end && r.end(e[e.length - 1]);
          },
        });
      else if (r.route && 0 < r.route.legs.length)
        for (var e, t = r.route.legs[0].steps, o = 0; (e = t[o]); o++)
          (e.step_number = o), r.step(e);
    }),
    (p.prototype.drawSteppedRoute = function (s) {
      var a = this;
      if (s.origin && s.destination)
        this.getRoutes({
          origin: s.origin,
          destination: s.destination,
          travelMode: s.travelMode,
          waypoints: s.waypoints,
          error: s.error,
          callback: function (e) {
            if (
              (0 < e.length && s.start && s.start(e[e.length - 1]),
              0 < e.length && s.step)
            ) {
              var t = e[e.length - 1];
              if (0 < t.legs.length)
                for (var o, n = t.legs[0].steps, i = 0; (o = n[i]); i++) {
                  o.step_number = i;
                  var r = {
                    path: o.path,
                    strokeColor: s.strokeColor,
                    strokeOpacity: s.strokeOpacity,
                    strokeWeight: s.strokeWeight,
                  };
                  s.hasOwnProperty("icons") && (r.icons = s.icons),
                    a.drawPolyline(r),
                    s.step(o, t.legs[0].steps.length - 1);
                }
            }
            0 < e.length && s.end && s.end(e[e.length - 1]);
          },
        });
      else if (s.route && 0 < s.route.legs.length)
        for (var e, t = s.route.legs[0].steps, o = 0; (e = t[o]); o++) {
          e.step_number = o;
          var n = {
            path: e.path,
            strokeColor: s.strokeColor,
            strokeOpacity: s.strokeOpacity,
            strokeWeight: s.strokeWeight,
          };
          s.hasOwnProperty("icons") && (n.icons = s.icons),
            a.drawPolyline(n),
            s.step(e);
        }
    }),
    (p.Route = function (e) {
      (this.origin = e.origin),
        (this.destination = e.destination),
        (this.waypoints = e.waypoints),
        (this.map = e.map),
        (this.route = e.route),
        (this.step_count = 0),
        (this.steps = this.route.legs[0].steps),
        (this.steps_length = this.steps.length);
      var t = {
        path: new google.maps.MVCArray(),
        strokeColor: e.strokeColor,
        strokeOpacity: e.strokeOpacity,
        strokeWeight: e.strokeWeight,
      };
      e.hasOwnProperty("icons") && (t.icons = e.icons),
        (this.polyline = this.map.drawPolyline(t).getPath());
    }),
    (p.Route.prototype.getRoute = function (t) {
      var o = this;
      this.map.getRoutes({
        origin: this.origin,
        destination: this.destination,
        travelMode: t.travelMode,
        waypoints: this.waypoints || [],
        error: t.error,
        callback: function () {
          (o.route = e[0]), t.callback && t.callback.call(o);
        },
      });
    }),
    (p.Route.prototype.back = function () {
      if (0 < this.step_count) {
        this.step_count--;
        var e,
          t = this.route.legs[0].steps[this.step_count].path;
        for (e in t) t.hasOwnProperty(e) && this.polyline.pop();
      }
    }),
    (p.Route.prototype.forward = function () {
      if (this.step_count < this.steps_length) {
        var e,
          t = this.route.legs[0].steps[this.step_count].path;
        for (e in t) t.hasOwnProperty(e) && this.polyline.push(t[e]);
        this.step_count++;
      }
    }),
    (p.prototype.checkGeofence = function (e, t, o) {
      return o.containsLatLng(new google.maps.LatLng(e, t));
    }),
    (p.prototype.checkMarkerGeofence = function (e, t) {
      if (e.fences)
        for (var o, n = 0; (o = e.fences[n]); n++) {
          var i = e.getPosition();
          this.checkGeofence(i.lat(), i.lng(), o) || t(e, o);
        }
    }),
    (p.prototype.toImage = function (e) {
      var e = e || {},
        t = {};
      if (
        ((t.size = e.size || [this.el.clientWidth, this.el.clientHeight]),
        (t.lat = this.getCenter().lat()),
        (t.lng = this.getCenter().lng()),
        0 < this.markers.length)
      ) {
        t.markers = [];
        for (var o = 0; o < this.markers.length; o++)
          t.markers.push({
            lat: this.markers[o].getPosition().lat(),
            lng: this.markers[o].getPosition().lng(),
          });
      }
      return (
        0 < this.polylines.length &&
          ((e = this.polylines[0]),
          (t.polyline = {}),
          (t.polyline.path = google.maps.geometry.encoding.encodePath(
            e.getPath()
          )),
          (t.polyline.strokeColor = e.strokeColor),
          (t.polyline.strokeOpacity = e.strokeOpacity),
          (t.polyline.strokeWeight = e.strokeWeight)),
        p.staticMapURL(t)
      );
    }),
    (p.staticMapURL = function (e) {
      var t = [],
        o =
          ("file:" === location.protocol ? "http:" : location.protocol) +
          "//maps.googleapis.com/maps/api/staticmap";
      e.url && ((o = e.url), delete e.url), (o += "?");
      var n = e.markers;
      delete e.markers, !n && e.marker && ((n = [e.marker]), delete e.marker);
      var i = e.styles;
      delete e.styles;
      var r = e.polyline;
      delete e.polyline,
        e.center
          ? (t.push("center=" + e.center), delete e.center)
          : e.address
          ? (t.push("center=" + e.address), delete e.address)
          : e.lat
          ? (t.push(["center=", e.lat, ",", e.lng].join("")),
            delete e.lat,
            delete e.lng)
          : e.visible &&
            ((s = encodeURI(e.visible.join("|"))), t.push("visible=" + s));
      var s = e.size;
      s ? (s.join && (s = s.join("x")), delete e.size) : (s = "630x300"),
        t.push("size=" + s),
        e.zoom || !1 === e.zoom || (e.zoom = 15);
      s = !e.hasOwnProperty("sensor") || !!e.sensor;
      for (c in (delete e.sensor, t.push("sensor=" + s), e))
        e.hasOwnProperty(c) && t.push(c + "=" + e[c]);
      if (n)
        for (var a, l, p = 0; (y = n[p]); p++) {
          for (var c in ((a = []),
          y.size && "normal" !== y.size
            ? (a.push("size:" + y.size), delete y.size)
            : y.icon && (a.push("icon:" + encodeURI(y.icon)), delete y.icon),
          y.color &&
            (a.push("color:" + y.color.replace("#", "0x")), delete y.color),
          y.label &&
            (a.push("label:" + y.label[0].toUpperCase()), delete y.label),
          (l = y.address || y.lat + "," + y.lng),
          delete y.address,
          delete y.lat,
          delete y.lng,
          y))
            y.hasOwnProperty(c) && a.push(c + ":" + y[c]);
          a.length || 0 === p
            ? (a.push(l), (a = a.join("|")), t.push("markers=" + encodeURI(a)))
            : ((a = t.pop() + encodeURI("|" + l)), t.push(a));
        }
      if (i)
        for (p = 0; p < i.length; p++) {
          var g = [];
          i[p].featureType &&
            g.push("feature:" + i[p].featureType.toLowerCase()),
            i[p].elementType &&
              g.push("element:" + i[p].elementType.toLowerCase());
          for (var h = 0; h < i[p].stylers.length; h++)
            for (var u in i[p].stylers[h]) {
              var d = i[p].stylers[h][u];
              ("hue" != u && "color" != u) || (d = "0x" + d.substring(1)),
                g.push(u + ":" + d);
            }
          var m = g.join("|");
          "" != m && t.push("style=" + m);
        }
      function f(e, t) {
        if ("#" === e[0] && ((e = e.replace("#", "0x")), t)) {
          if (((t = parseFloat(t)), 0 === (t = Math.min(1, Math.max(t, 0)))))
            return "0x00000000";
          1 === (t = (255 * t).toString(16)).length && (t += t),
            (e = e.slice(0, 8) + t);
        }
        return e;
      }
      if (r) {
        var y = r,
          r = [];
        y.strokeWeight && r.push("weight:" + parseInt(y.strokeWeight, 10)),
          y.strokeColor &&
            ((s = f(y.strokeColor, y.strokeOpacity)), r.push("color:" + s)),
          y.fillColor &&
            ((k = f(y.fillColor, y.fillOpacity)), r.push("fillcolor:" + k));
        var v = y.path;
        if (v.join) for (var w, h = 0; (w = v[h]); h++) r.push(w.join(","));
        else r.push("enc:" + v);
        (r = r.join("|")), t.push("path=" + encodeURI(r));
      }
      var k = window.devicePixelRatio || 1;
      return t.push("scale=" + k), o + (t = t.join("&"));
    }),
    (p.prototype.addMapType = function (e, t) {
      if (!t.hasOwnProperty("getTileUrl") || "function" != typeof t.getTileUrl)
        throw "'getTileUrl' function required.";
      t.tileSize = t.tileSize || new google.maps.Size(256, 256);
      t = new google.maps.ImageMapType(t);
      this.map.mapTypes.set(e, t);
    }),
    (p.prototype.addOverlayMapType = function (e) {
      if (!e.hasOwnProperty("getTile") || "function" != typeof e.getTile)
        throw "'getTile' function required.";
      var t = e.index;
      delete e.index, this.map.overlayMapTypes.insertAt(t, e);
    }),
    (p.prototype.removeOverlayMapType = function (e) {
      this.map.overlayMapTypes.removeAt(e);
    }),
    (p.prototype.addStyle = function (e) {
      var t = new google.maps.StyledMapType(e.styles, {
        name: e.styledMapName,
      });
      this.map.mapTypes.set(e.mapTypeId, t);
    }),
    (p.prototype.setStyle = function (e) {
      this.map.setMapTypeId(e);
    }),
    (p.prototype.createPanorama = function (e) {
      return (
        (e.hasOwnProperty("lat") && e.hasOwnProperty("lng")) ||
          ((e.lat = this.getCenter().lat()), (e.lng = this.getCenter().lng())),
        (this.panorama = p.createPanorama(e)),
        this.map.setStreetView(this.panorama),
        this.panorama
      );
    }),
    (p.createPanorama = function (t) {
      var e = x(t.el, t.context);
      (t.position = new google.maps.LatLng(t.lat, t.lng)),
        delete t.el,
        delete t.context,
        delete t.lat,
        delete t.lng;
      for (
        var o = [
            "closeclick",
            "links_changed",
            "pano_changed",
            "position_changed",
            "pov_changed",
            "resize",
            "visible_changed",
          ],
          n = M({ visible: !0 }, t),
          i = 0;
        i < o.length;
        i++
      )
        delete n[o[i]];
      for (
        var r = new google.maps.StreetViewPanorama(e, n), i = 0;
        i < o.length;
        i++
      )
        !(function (e) {
          t[e] &&
            google.maps.event.addListener(r, e, function () {
              t[e].apply(this);
            });
        })(o[i]);
      return r;
    }),
    (p.prototype.on = function (e, t) {
      return p.on(e, this, t);
    }),
    (p.prototype.off = function (e) {
      p.off(e, this);
    }),
    (p.prototype.once = function (e, t) {
      return p.once(e, this, t);
    }),
    (p.custom_events = [
      "marker_added",
      "marker_removed",
      "polyline_added",
      "polyline_removed",
      "polygon_added",
      "polygon_removed",
      "geolocated",
      "geolocation_failed",
    ]),
    (p.on = function (e, t, o) {
      if (-1 == p.custom_events.indexOf(e))
        return (
          t instanceof p && (t = t.map), google.maps.event.addListener(t, e, o)
        );
      o = { handler: o, eventName: e };
      return (
        (t.registered_events[e] = t.registered_events[e] || []),
        t.registered_events[e].push(o),
        o
      );
    }),
    (p.off = function (e, t) {
      -1 == p.custom_events.indexOf(e)
        ? (t instanceof p && (t = t.map),
          google.maps.event.clearListeners(t, e))
        : (t.registered_events[e] = []);
    }),
    (p.once = function (e, t, o) {
      if (-1 == p.custom_events.indexOf(e))
        return (
          t instanceof p && (t = t.map),
          google.maps.event.addListenerOnce(t, e, o)
        );
    }),
    (p.fire = function (e, t, o) {
      if (-1 == p.custom_events.indexOf(e))
        google.maps.event.trigger(
          t,
          e,
          Array.prototype.slice.apply(arguments).slice(2)
        );
      else if (e in o.registered_events)
        for (var n = o.registered_events[e], i = 0; i < n.length; i++)
          n[i].handler.apply(o, [t]);
    }),
    (p.geolocate = function (t) {
      var o = t.always || t.complete;
      navigator.geolocation
        ? navigator.geolocation.getCurrentPosition(
            function (e) {
              t.success(e), o && o();
            },
            function (e) {
              t.error(e), o && o();
            },
            t.options
          )
        : (t.not_supported(), o && o());
    }),
    (p.geocode = function (e) {
      this.geocoder = new google.maps.Geocoder();
      var o = e.callback;
      e.hasOwnProperty("lat") &&
        e.hasOwnProperty("lng") &&
        (e.latLng = new google.maps.LatLng(e.lat, e.lng)),
        delete e.lat,
        delete e.lng,
        delete e.callback,
        this.geocoder.geocode(e, function (e, t) {
          o(e, t);
        });
    }),
    "object" == typeof window.google &&
      window.google.maps &&
      (google.maps.Polygon.prototype.getBounds ||
        (google.maps.Polygon.prototype.getBounds = function (e) {
          for (
            var t,
              o = new google.maps.LatLngBounds(),
              n = this.getPaths(),
              i = 0;
            i < n.getLength();
            i++
          ) {
            t = n.getAt(i);
            for (var r = 0; r < t.getLength(); r++) o.extend(t.getAt(r));
          }
          return o;
        }),
      google.maps.Polygon.prototype.containsLatLng ||
        (google.maps.Polygon.prototype.containsLatLng = function (e) {
          var t = this.getBounds();
          if (null !== t && !t.contains(e)) return !1;
          for (var o = !1, n = this.getPaths().getLength(), i = 0; i < n; i++)
            for (
              var r = this.getPaths().getAt(i),
                s = r.getLength(),
                a = s - 1,
                l = 0;
              l < s;
              l++
            ) {
              var p = r.getAt(l),
                c = r.getAt(a);
              ((p.lng() < e.lng() && c.lng() >= e.lng()) ||
                (c.lng() < e.lng() && p.lng() >= e.lng())) &&
                p.lat() +
                  ((e.lng() - p.lng()) / (c.lng() - p.lng())) *
                    (c.lat() - p.lat()) <
                  e.lat() &&
                (o = !o),
                (a = l);
            }
          return o;
        }),
      google.maps.Circle.prototype.containsLatLng ||
        (google.maps.Circle.prototype.containsLatLng = function (e) {
          return (
            !google.maps.geometry ||
            google.maps.geometry.spherical.computeDistanceBetween(
              this.getCenter(),
              e
            ) <= this.getRadius()
          );
        }),
      (google.maps.Rectangle.prototype.containsLatLng = function (e) {
        return this.getBounds().contains(e);
      }),
      (google.maps.LatLngBounds.prototype.containsLatLng = function (e) {
        return this.contains(e);
      }),
      (google.maps.Marker.prototype.setFences = function (e) {
        this.fences = e;
      }),
      (google.maps.Marker.prototype.addFence = function (e) {
        this.fences.push(e);
      }),
      (google.maps.Marker.prototype.getId = function () {
        return this.__gm_id;
      })),
    Array.prototype.indexOf ||
      (Array.prototype.indexOf = function (e) {
        if (null == this) throw new TypeError();
        var t = Object(this),
          o = t.length >>> 0;
        if (0 == o) return -1;
        var n = 0;
        if (
          (1 < arguments.length &&
            ((n = Number(arguments[1])) != n
              ? (n = 0)
              : 0 != n &&
                n != 1 / 0 &&
                n != -1 / 0 &&
                (n = (0 < n || -1) * Math.floor(Math.abs(n)))),
          o <= n)
        )
          return -1;
        for (var i = 0 <= n ? n : Math.max(o - Math.abs(n), 0); i < o; i++)
          if (i in t && t[i] === e) return i;
        return -1;
      }),
    p
  );
});
