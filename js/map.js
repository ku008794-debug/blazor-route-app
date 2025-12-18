window.mapFunctions = {
    map: null,
    routeLine: null,

    initMap: function (lat, lon) {

        //現在地が取得されているか
        console.log("initMap", lat, lon);
        if (!lat || !lon) {
            console.error("lat/lon が不正です", lat, lon);
        }

        if (!this.map) {
            this.map = L.map('map').setView([lat, lon], 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19
            }).addTo(this.map);
        } else {
            this.map.setView([lat, lon], 15);
        }
        L.marker([lat, lon]).addTo(this.map).bindPopup("現在地").openPopup();
    },

    drawRoute: function (coords) {
        // 前のルートを削除
        if (this.routeLine) {
            this.map.removeLayer(this.routeLine);
        }

        // C#から送られた配列をLeaflet用に変換
        let latlngs = coords.map(c => [c.lat, c.lng]);

        // 線を引く
        this.routeLine = L.polyline(latlngs).addTo(this.map);

        // 自動ズーム
        this.map.fitBounds(this.routeLine.getBounds());
    }
};
