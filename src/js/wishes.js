import {
    formattedDate,
    formattedName,
    generateRandomColor,
    generateRandomId,
    getCurrentDateTime,
    renderElement
} from "../utils/helper.js";
import {data} from "../assets/data/data.js";
import {commentsService} from "../services/commentsService.js";

export const wishes = () => {
    const wishesContainer = document.querySelector('.wishes');
    const [_, form] = wishesContainer.children[2].children;
    const [peopleComment, ___, containerComment] = wishesContainer.children[3].children;
    const buttonForm = form.children[6];
    const pageNumber = wishesContainer.querySelector('.page-number');
    const [prevButton, nextButton] = wishesContainer.querySelectorAll('.button-grup button');

    // const listItemBank = (data) => (
    //     `  <figure data-aos="zoom-in" data-aos-duration="1000">
    //             <img src=${data.icon} alt="bank icon animation">
    //             <figcaption>No. Rekening ${data.rekening.slice(0, 4)}xxxx <br>A.n ${data.name}</figcaption>
    //             <button data-rekening=${data.rekening} aria-label="copy rekening">Salin No. Rekening</button>
    //        </figure>`
    // );

    // const initialBank = () => {
    //     const wishesBank = wishesContainer.children[1];
    //     const [_, __, containerBank] = wishesBank.children;

    //     renderElement(data.bank, containerBank, listItemBank);

    //     containerBank.querySelectorAll('button').forEach((button) => {
    //         button.addEventListener('click', async (e) => {
    //             const rekening = e.target.dataset.rekening;
    //             try {
    //                 await navigator.clipboard.writeText(rekening);
    //                 button.textContent = 'Berhasil menyalin';
    //             } catch (error) {
    //                 console.log(`Error : ${error.message}`);
    //             } finally {
    //                 setTimeout(() => {
    //                     button.textContent = 'Salin No. Rekening';
    //                 }, 2000);
    //             }
    //         });
    //     });
    // };

    const listItemComment = (data) => {
        const name = formattedName(data.name);
        const newDate = formattedDate(data.date);
        let date = "";

        if (newDate.days < 1) {
            if (newDate.hours < 1) {
                date = `${newDate.minutes} phút trước`;
            } else {
                date = `${newDate.hours} giờ, ${newDate.minutes} phút trước`;
            }
        } else {
            date = `${newDate.days} ngày, ${newDate.hours} giờ trước`;
        }

        return ` <li data-aos="zoom-in" data-aos-duration="1000">
                     <div style="background-color: ${data.color}">${data.name.charAt(0).toUpperCase()}</div>
                     <div>
                         <h4>${name}</h4>
                         <p>${date}</p>
                         <h5>${data.message}</h5>
                     </div>
                 </li>`;
    };

    let lengthComment;

    const initialComment = async () => {
        containerComment.innerHTML = `<h1 style="font-size: 1rem; margin: auto">Loading...</h1>`;
        peopleComment.textContent = '...';
        pageNumber.textContent = '..';

        try {
            const response = await commentsService.getComments();
            const {comments} = response;

            lengthComment = comments.length;
            comments.reverse();

            if (comments.length > 0) {
                peopleComment.textContent = `${comments.length} người đã gửi lời chúc`;
            } else {
                peopleComment.textContent = `Chưa có ai gửi lời chúc`;
            }

            pageNumber.textContent = '1';
            renderElement(comments.slice(startIndex, endIndex), containerComment, listItemComment);
        } catch (error) {
            return `Error : ${error.message}`;
        }
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        buttonForm.textContent = 'Loading...';

        const comment = {
            id: generateRandomId(),
            name: e.target.name.value,
            status: e.target.status.value === 'y' ? 'Có mặt' : 'Vắng mặt',
            message: e.target.message.value,
            date: getCurrentDateTime(),
            color: generateRandomColor(),
        };

        try {
            const response = await commentsService.getComments();

            await commentsService.addComment(comment);

            lengthComment = response.comment.length;

            peopleComment.textContent = `${++response.comment.length} người đã gửi lời chúc`;
            containerComment.insertAdjacentHTML('afterbegin', listItemComment(comment));
        } catch (error) {
            return `Error : ${error.message}`;
        } finally {
            buttonForm.textContent = 'Gửi';
            form.reset();
        }
    });

    // click prev & next
    let currentPage = 1;
    let itemsPerPage = 4;
    let startIndex = 0;
    let endIndex = itemsPerPage;

    const updatePageContent = async () => {
        containerComment.innerHTML = '<h1 style="font-size: 1rem; margin: auto">Loading...</h1>';
        pageNumber.textContent = '..';
        prevButton.disabled = true;
        nextButton.disabled = true;

        try {
            const response = await commentsService.getComments();
            const {comments} = response;

            comments.reverse();

            renderElement(comments.slice(startIndex, endIndex), containerComment, listItemComment);
            pageNumber.textContent = currentPage.toString();
        } catch (error) {
            console.log(error);
        } finally {
            prevButton.disabled = false;
            nextButton.disabled = false;
        }
    }

    nextButton.addEventListener('click', async () => {
        if (endIndex <= lengthComment) {
            currentPage++;
            startIndex = (currentPage - 1) * itemsPerPage;
            endIndex = startIndex + itemsPerPage;
            await updatePageContent();
        }
    });

    prevButton.addEventListener('click', async () => {
        if (currentPage > 1) {
            currentPage--;
            startIndex = (currentPage - 1) * itemsPerPage;
            endIndex = startIndex + itemsPerPage;
            await updatePageContent();
        }
    });

    // initialComment().then();
    // initialBank();
};
