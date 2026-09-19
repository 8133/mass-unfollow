const unfollowEveryone = (async function () {
    const UNFOLLOW_LIMIT = 100;
    const BETWEEN_UNFOLLOWS = 50;
    const CONFIRM_TIMEOUT = 2000;
    const POLL_INTERVAL = 10;
    const BREAK_DURATION = 3 * 60 * 1000;
    const TOTAL_DURATION = 10 * 60 * 1000;

    const delay = ms =>
        new Promise(resolve => setTimeout(resolve, ms));

    const findButtonByText = text =>
        Array.from(document.querySelectorAll("button"))
            .find(button => button.innerText.trim() === text);

    async function waitForButton(text, timeout = 2000) {
        const start = Date.now();

        while (Date.now() - start < timeout) {
            const button = findButtonByText(text);

            if (button) {
                return button;
            }

            await delay(POLL_INTERVAL);
        }

        return null;
    }

    console.log("Start");

    const overallStart = Date.now();
    let unfollowCount = 0;
    let failedCount = 0;

    while (Date.now() - overallStart < TOTAL_DURATION) {
        for (let i = 0; i < UNFOLLOW_LIMIT; i++) {
            const followButton = findButtonByText("Following");

            if (!followButton) {
                console.log("No Following button found.");
                break;
            }

            followButton.scrollIntoView({
                block: "center",
                behavior: "instant"
            });

            followButton.click();

            const confirmButton =
                await waitForButton("Unfollow", CONFIRM_TIMEOUT);

            if (!confirmButton) {
                failedCount++;
                console.log(`Confirmation timeout (${failedCount} failures)`);
                await delay(250);
                continue;
            }

            confirmButton.click();
            unfollowCount++;

            console.log(`Unfollowed #${unfollowCount}`);

            await delay(BETWEEN_UNFOLLOWS);
        }

        console.log(
            `Batch complete: ${unfollowCount} unfollowed, ${failedCount} failures`
        );

        console.log("Taking a 3 minute break...");

        await delay(BREAK_DURATION);
    }

    console.log(
        `Finished — ${unfollowCount} unfollowed, ${failedCount} failures`
    );
})();
