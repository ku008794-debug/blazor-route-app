window.geoFunctions = {
    getLocation: function (dotnetHelper) {
        if (!navigator.geolocation) {
            alert("位置情報が利用できません。");
            return;
        }

        const options = {
            enableHighAccuracy: true, // 高精度モードON
            timeout: 10000,           // 最大10秒でタイムアウト
            maximumAge: 0             // キャッシュを使わない
        };

        navigator.geolocation.getCurrentPosition(function (pos) 
        {
            dotnetHelper.invokeMethodAsync("SetLocation",
                pos.coords.latitude,
                pos.coords.longitude);
        },function (err)
        {
            alert("位置情報を取得できません: " + err.message);
        }, options);
    }
};
