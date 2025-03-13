import { Auction } from "../data/auction";

let dato:Auction

export const updateCountdown = (data: Auction) => {
    dato = data
    const currentTime = new Date().getTime();
    const endTime = data.endtime.getTime();
    const timeLeft = endTime - currentTime;

    const countdown = document.getElementById("countdown") as HTMLParagraphElement;
    const endtime = document.getElementById("endtime-container") as HTMLDivElement;
    const bidForm = document.getElementById("bidform-container") as HTMLDivElement;
    const bid = document.getElementById("bid") as HTMLParagraphElement;
    const startPriceContainer = document.getElementById("startPriceContainer") as HTMLParagraphElement;

    if (timeLeft <= 0) {
        countdown.innerHTML = "Auction is closed";
        if (endtime) {
            endtime.remove();
        }
        if(startPriceContainer) {
            startPriceContainer.remove();
        }
        if (bidForm) {
            bidForm.remove();
        }
        if (bid && bid.firstChild) {
            bid.firstChild.textContent = "Final price: "
        }

        clearInterval(countdownInterval);
    } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        let showCountdown = "";

        showCountdown += days > 0 ? days + "d " : "";
        showCountdown += (hours > 0 || days > 0) ? hours + "h " : "";
        showCountdown += (minutes > 0 || hours > 0 || days > 0) ? minutes + "m " : "";
        showCountdown += seconds + "s";

        countdown.innerHTML = showCountdown;
    }
}

const countdownInterval = setInterval(()=>updateCountdown(dato), 1000);

