// part 0 utils
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
const saveTemplateAsFile = (filename, dataObjToWrite) => {
	const blob = new Blob([JSON.stringify(dataObjToWrite)], { type: "text/json" });
	const link = document.createElement("a");

	link.download = filename;
	link.href = window.URL.createObjectURL(blob);
	link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

	const evt = new MouseEvent("click", {
		view: window,
		bubbles: true,
		cancelable: true,
	});

	link.dispatchEvent(evt);
	link.remove()
};

// part 1 load all
async function loadAllData() {
	let moreContent = true;
	while (moreContent) {
		moreContent = false;
		window.scrollTo(0, document.body.scrollHeight);
		let moreComments = document.querySelectorAll("button.comments-comments-list__load-more-comments-button");
		if (moreComments.length > 0) {
			console.log(`clicked more comments`)
			moreComments[0].click()
			moreContent = true;
		}
		await sleep(2000)
	}

	let prevReplies = document.querySelectorAll("button.show-prev-replies")
	if (prevReplies.length > 0) {
		Array.from(prevReplies).forEach(b => b.click())
		console.log(`clicked prevReplies, sleeping 20s`)
		await sleep(20000)
		console.log(`20s done`)
	}

	let seeMore = document.querySelectorAll(".feed-shared-inline-show-more-text__see-more-less-toggle")
	if (seeMore.length > 0) {
		Array.from(seeMore).forEach(b => b.click())
		console.log(`clicked seeMore, sleeping 20s`)
		await sleep(20000)
		console.log(`20s done`)
	}
}


// part 2 - extract
async function scrollToBottomReactions() {
	console.log(`iteration ${++i} scrollTop=${reactionsPane.scrollTop} and scrollHeight=${reactionsPane.scrollHeight} and lastHeight=${lastHeight}`)
	if (lastHeight != reactionsPane.scrollHeight) {
		reactionsPane.scrollTop = reactionsPane.scrollHeight // scroll to end	
		lastHeight = reactionsPane.scrollHeight
	} else {
		clearInterval(interval)
		interval = null;
		collectReactions()
	}
}

async function getCommentData(c) {
	console.log(c)
	let reaction_count = 0;
	try {
		reaction_count = c.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(".comments-comment-social-bar__reactions-count").textContent.trim();
	} catch { }

	let reactions = []
	if (reaction_count > 0) {
		// open reactions pane
		c.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(".comments-comment-social-bar__reactions-count").click()

		let reactionsPane = document.querySelector(".artdeco-modal__content")//get scrollable reactions pane
		for (let i = 0; i < 100 && reactionsPane == null; i++) {
			await sleep(200);
			reactionsPane = document.querySelector(".artdeco-modal__content")//get scrollable reactions pane
		}
		console.log(`got reactions pane: ${reactionsPane}`)
		await sleep(500);

		let countLoaded = reactionsPane.querySelectorAll(".artdeco-entity-lockup").length;
		for (let i = 0; i < 100 && countLoaded == 0; i++) {
			console.log(`waiting for reactions to load ...`)
			await sleep(200);
			countLoaded = reactionsPane.querySelectorAll(".artdeco-entity-lockup").length;
		}

		// expand all the comments, can take some time
		let done = false, i = 0, lastHeight = 0;
		while (!done) {
			console.log(`iteration ${++i} scrollTop=${reactionsPane.scrollTop} and scrollHeight=${reactionsPane.scrollHeight} and lastHeight=${lastHeight}`)
			if (lastHeight != reactionsPane.scrollHeight) {
				reactionsPane.scrollTop = reactionsPane.scrollHeight // scroll to end	
				lastHeight = reactionsPane.scrollHeight
				await sleep(1500);
			} else {
				done = true
			}
		}
		await sleep(500);

		reactions = Array.from(reactionsPane.querySelectorAll(".artdeco-entity-lockup")).map((r) => {
			return {
				img: r.querySelector("img.ivm-view-attr__img--centered") ? r.querySelector("img.ivm-view-attr__img--centered").src : "",
				url: r.parentElement.href,
				name: r.querySelector(".artdeco-entity-lockup__title>span>span").textContent.trim(),
				job_title: r.querySelector(".artdeco-entity-lockup__caption").textContent.trim(),
				reaction: r.querySelector("img.reactions-icon").getAttribute("data-test-reactions-icon-type").trim().toLowerCase()
			}
		})
		console.log(`got ${reactions.length} reactions`)
		document.querySelector(".artdeco-modal__dismiss").click()
	}

	return {
		img: c.querySelector("img").src,
		url: c.querySelector("a.ember-view").href.split("?")[0],
		name: c.querySelector(".comments-post-meta__name-text").textContent.trim(),
		job_title: c.querySelector(".comments-post-meta__headline").textContent.trim(),
		time_ago: c.nextElementSibling.textContent.trim(),
		"text": c.nextElementSibling.nextElementSibling.querySelector(".comments-comment-item__main-content").textContent.trim(),
		reaction_count,
		real_reaction_count: reactions.length,
		reactions: reactions
	}
}

async function getPostData() {
	//main post
	let p = document.querySelector(".feed-shared-actor")
	let reaction_count = document.querySelector(".social-details-social-counts__reactions-count").textContent.trim();
	let reactions = []
	if (reaction_count > 0) {
		// open reactions pane
		document.querySelector(".social-details-social-counts__reactions-count").parentElement.click()

		let reactionsPane = document.querySelector(".artdeco-modal__content")//get scrollable reactions pane
		for (let i = 0; i < 100 && reactionsPane == null; i++) {
			await sleep(200);
			reactionsPane = document.querySelector(".artdeco-modal__content")//get scrollable reactions pane
		}
		console.log(`got reactions pane: ${reactionsPane}`)
		await sleep(500);

		let countLoaded = reactionsPane.querySelectorAll(".artdeco-entity-lockup").length;
		for (let i = 0; i < 100 && countLoaded == 0; i++) {
			console.log(`waiting for reactions to load ...`)
			await sleep(200);
			countLoaded = reactionsPane.querySelectorAll(".artdeco-entity-lockup").length;
		}

		// expand all the comments, can take some time
		let done = false, i = 0, lastHeight = 0;
		while (!done) {
			console.log(`iteration ${++i} scrollTop=${reactionsPane.scrollTop} and scrollHeight=${reactionsPane.scrollHeight} and lastHeight=${lastHeight}`)
			if (lastHeight != reactionsPane.scrollHeight) {
				reactionsPane.scrollTop = reactionsPane.scrollHeight // scroll to end	
				lastHeight = reactionsPane.scrollHeight
				await sleep(1500);
			} else {
				done = true
			}
		}
		await sleep(500);

		reactions = Array.from(reactionsPane.querySelectorAll(".artdeco-entity-lockup")).map((r) => {
			return {
				img: r.querySelector("img.ivm-view-attr__img--centered") ? r.querySelector("img.ivm-view-attr__img--centered").src : "",
				url: r.parentElement.href.split("?")[0],
				name: r.querySelector(".artdeco-entity-lockup__title>span").textContent.trim(),
				job_title: r.querySelector(".artdeco-entity-lockup__caption").textContent.trim(),
				reaction: r.querySelector("img.reactions-icon").getAttribute("data-test-reactions-icon-type").trim().toLowerCase()
			}
		})
		console.log(`got ${reactions.length} reactions`)
		document.querySelector(".artdeco-modal__dismiss").click()
	}

	return {
		img: p.querySelector("img").src,
		url: p.querySelector("a.app-aware-link").href.split("?")[0],
		name: p.querySelector(".feed-shared-actor__name").textContent.trim(),
		job_title: p.querySelector(".feed-shared-actor__description").textContent.trim(),
		"text": p.nextElementSibling.nextElementSibling.textContent.trim(),
		comment_count: document.querySelector(".social-details-social-counts__item--with-social-proof").textContent.trim().split("comment")[0].trim(),
		share_count: document.querySelector(".social-details-social-counts__item--with-social-proof").nextElementSibling.textContent.trim().split("share")[0].trim(),
		reaction_count,
		real_reaction_count: reactions.length,
		reactions,

	}
}

async function getAndDownloadAllData(filename) {
	let mainPost = await getPostData();
	saveTemplateAsFile(`post-${filename}`, mainPost);

	let allDirectComments = Array.from(document.querySelectorAll(".comments-comments-list__comment-item"))
	console.log(`found ${allDirectComments.length} direct comments`)
	let result = []
	for (let index = 0; index < allDirectComments.length; index++) {
		topLevel = allDirectComments[index];
		console.log(`getting ${index + 1}/${allDirectComments.length} direct comments`)
		let allComments = Array.from(topLevel.querySelectorAll(".comments-post-meta"))
		let topLevelComment = await getCommentData(allComments[0])
		topLevelComment.replies = []
		for (innerComment of allComments.slice(1)) {
			topLevelComment.replies.push(await getCommentData(innerComment))
		}
		result.push(topLevelComment)
		// break; //TODO: REMOVE but can be used to test just 1
	}
	saveTemplateAsFile(filename, result);
}