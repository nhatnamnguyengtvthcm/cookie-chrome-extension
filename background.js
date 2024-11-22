// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCookies") {
        const api = request.param; // Nhận tham số bổ sung từ thông điệp
        console.log("Received additional param:", api); // In ra giá trị tham số

        // Lấy URL của tab hiện tại
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            const url = new URL(tab.url);
            console.log("url_href:", url.href); // In ra giá trị tham số
            console.log("url:", url); // In ra giá trị tham số
            const baseUrl = url.origin
            console.log("Base URL:", baseUrl);
            // Lấy tất cả cookies của trang hiện tại
            chrome.cookies.getAll({ url: `${url.href}` }, (cookies) => {
                const cookieHeader = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
                console.log("All Cookies:", cookieHeader); // In ra tất cả cookies
                fetch(`https://app.getgames.tg/api/v2/account`, {
                    method: 'GET',
                    headers: {
                        'Cookie': cookieHeader
                    },  
                })
                .then(response => response.json())
                .then(data => {
                    console.log("fetching data:", data);
                    sendResponse({ data: data });
                })
                .catch(error => {
                    console.error("Error fetching data:");
                    sendResponse({ error: "Failed to fetch data" });
                });
                
            });
        });
        return true; // Để giữ cho sendResponse hoạt động bất đồng bộ
    }
});