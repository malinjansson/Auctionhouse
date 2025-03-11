import { Auction } from "../data/auction";


export const updateCountdown = (data: Auction) => {
    const currentTime = new Date().getTime();
    const endTime = data.endtime.getTime();
    const timeLeft = endTime - currentTime;

    const countdown = document.getElementById("countdown") as HTMLParagraphElement;
    const endtime = document.getElementById("endtime-container") as HTMLDivElement;
    const bidForm = document.getElementById("bidform-container") as HTMLDivElement;

    if (timeLeft <= 0) {
        countdown.innerHTML = "Auction is closed";
        if (endtime) {
            endtime.remove();
        }
        if (bidForm) {
            bidForm.remove();
        }

        clearInterval(countdownInterval);
    } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);

