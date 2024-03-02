# Welcome to Moosage!

A platform where users can share their moods and connect with others through personalized messages (hereby called moosages). Celebrate occasions, send encouragement, write notes and wishes, or simply share your thoughts on a fun, mood-driven space.

Vibe and connect with us!

:heart_eyes: Have fun! :stuck_out_tongue_winking_eye:

## Screenshots

**Homepage (if not logged in)**

<img src="/src/assets/images/homepage.png">

**Homepage/Dashboard (if logged in)**

<img src="/src/assets/images/dashboard.png">

**Board Assistant - Moosage Count Feature**

<img src="/src/assets/images/count.png">

**Board Assistant - Delete Feature**

<img src="/src/assets/images/boardassist.png">

**Board Assistant - Copy Board Public URL Feature**

<img src="/src/assets/images/copy.png">

**Inline Editing of Boards**

<img src="/src/assets/images/editboard.png">

**Inline Editing of Moosages**

<img src="/src/assets/images/editmoosage.png">

**Error Page**

<img src="/src/assets/images/errorpage.png">

## Technologies Used

**Frontend**: JavaScript, CSS, HTML, GitHub, Node.js, React, React Router, Vite, Tailwind CSS/DaisyUI, CryptoJS

**Backend**: Node.js, Express, Mongoose, MongoDB, JSON Web Token, Cors

**Client-Side Storage**: localStorage (for token storage)

## Getting Started

Web link: https://moosages.onrender.com

Repos:

- Frontend: https://github.com/xsijin/Moosage
- Backend: https://github.com/xsijin/Moosage-backend

Planning:

- [Trello Board](https://trello.com/b/BwHaFoYE/moosage)
- [Figma Wireframe](https://www.figma.com/file/PlKvJRUu8xNfe1TZ5DivEP/Untitled?type=design&node-id=0-1&mode=design&t=uvptxleRRYVarL6p-0)

## User Types, Authorization & Backend Protection

> [!IMPORTANT]
> | Authorization | Public | Logged in User | Admin | Backend Protection |
> | ----------------- | --------------| -------------- | -------------- | -------------- |
> | Read Moosages* | ✔ | ✔ | ✔ | |
> | Create Moosages | | ✔ | ✔ | ✔ |
> | Update Moosages | | ✔ (own**) | ✔ (all) | ✔ |
> | Delete Moosages | | ✔ (own**) | ✔ (all) | ✔ |
> | Read Boards* | ✔ | ✔ | ✔ | |
> | Create Boards | | ✔ | ✔ | ✔ |
> | Update Boards | | ✔ (own) | ✔ (all) | ✔ |
> | Delete Boards | | ✔ (own) | ✔ (all) | ✔ |
> | Read User Profile | ✔ | ✔ | ✔ | |
> | Create User (Sign up) | ✔ | | | |
> | Update User Profile | | ✔ (own) | ✔ (all) | ✔ |
> | Delete User | | ✔ (own) | ✔ (all) | ✔ |

\* Moosages and boards have a "private" feature. If set to private, only the board owner, moosage owner, or admin can read them. If a board is private, it cannot be accessed by URL.

\*\* Board owners can also update and delete other users' moosages posted on their board.

There is a two-step deletion process for deleting users, boards and moosages. On frontend, users will fetch PATCH requests that set their statuses to 'deleted', and removes the data from respective arrays. Then, an admin can permanently delete these items from the database.

In future, we may implement ways users can recover items which have been mistakenly soft deleted, and give users a cooldown period after deactivating their account to recover their boards and moosages.

- If a user is soft deleted, all their boards & moosages are soft deleted.
- If a board is soft deleted, all the moosages posted in it are soft deleted.

## Entity-Relationship-Diagram / DAOs

<img src="/src/assets/images/ERD.png">

## Next Steps

- [ ] Add login/signup validations on frontend
- [ ] Users can "like" boards & moosages
- [ ] Users can search for other users' profile & public boards
- [ ] Make boards more customizable so users can sort their boards, change positions, change layouts in dashboard, change colours or designs, etc.
- [ ] Pagination
- [ ] Allow users to update their passwords
- [ ] Allow users to add custom emojis
- [ ] Allow users to upload profile picture directly instead of using URL
- [ ] Instructions overlay
- [ ] Share to social media widgets
- [ ] Notifications for receiving new/unread moosages
- [ ] Media responsiveness for users to post moosages on the go
- [ ] Live updating of moosages via polling or WebSockets

## Code Sharing

- Using MongoDB noSQL database - the storage and querying of data outside the traditional structures found in relational databases
- Using Express.js Server Controller method
- Using React Components, DaisyUI components and TailwindCSS styling method
- Client-side routing:
  <img src="/src/assets/images/routing.png">

**Favorite React Component**

My favourite component is the EmojiPicker which creates the vibe of moosages by using emojis.

<img src="/src/assets/images/code.png">

Sample (able to maximize and search within the EmojiPicker):

<img src="/src/assets/images/sample.png">

## Key Challenges / Learning / Takeaways

1. Backend logic is important. It is ideal to map out the product logic before starting to code.
2. Priortize the MVP first before working on smaller / UI features. Then, debug as issues arise.
3. There are limitations to using JWT token to setState instead of utilizing useState within the app. (I used it to retrieve name & profile pic, and found out that the token doesn't update despite profile being updated, unless user relogins to set a new token.) May not be recommended to do so as well since JWT is meant for authentication.
4. Use React components to break down large codebases into smaller, more manageable pieces.

## Resources

- [Render](https://render.com/) - Deployment of Frontend & Backend
- [MongoDB](https://www.mongodb.com/) - MongoDB Database
- [DaisyUI](https://daisyui.com/) - Component library to style website
- [Figma](https://figma.com) - Wireframe
- [Trello](https://trello.com) - Ideas & User Story creation
- [Postman](https://www.postman.com) - API Client
- [X/Twitter](https://twitter.com/) - Idea inspiration
- [Emoji Picker React](https://github.com/ealush/emoji-picker-react#readme) - Emoji package
- [Emojipedia](https://emojipedia.org/cow-face#designs) - Cow logo and other emojis
- [stackoverflow](https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard) - Copy text to clipboard
- [stackoverflow](https://stackoverflow.com/questions/40769551/how-to-use-google-fonts-in-react-js) - Use google fonts
- [Google Fonts](https://fonts.google.com/share?selection.family=Hachi+Maru+Pop|Mali:ital,wght@0,400;0,500;1,400;1,500|Petit+Formal+Script) - Fonts
- [Random User Generator](https://randomuser.me/api/) - To simulate beta user accounts
- [Microsoft Designer](https://www.bing.com/images/create/a-simple-icon-with-empty-message-board-and-emoji-b/1-65cd9a8b374e4ced95ca0c690a6a10ca?id=foBV9%2blN3ktoPwhE0N%2bxJw%3d%3d&view=detailv2&idpp=genimg&thId=OIG3.EjSxX24LxS4vm3QW5.wy&FORM=GCRIDP&ajaxhist=0&ajaxserp=0) - Board Assistant image
- [Microsoft Designer](https://www.bing.com/images/create/pastel-cow-farm-with-flying-cows2c-more-pasture2c-si/1-65ded403bcc84838ac2e20eb73e2e2dd?id=HKvRuhbjY2JR1byoaF4R8w%3d%3d&view=detailv2&idpp=genimg&thId=OIG4.awixLYZfO0tbiC9bWJR7&FORM=GCRIDP&ajaxhist=0&ajaxserp=0) - Cow & pasture background
- [SVG Repo](https://www.svgrepo.com/svg/11641/curve-arrow-pointing-left) - Curve Arrow Pointing Left SVG
- [Google Images](https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F477832804%2Fphoto%2Fsleeping-cows-at-sunrise.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3DmtPZXS5trDLST4E-IAwhwFqf-JPBodJVOQhEP72tD8s%3D&tbnid=XAzSf482cQBxRM&vet=12ahUKEwiRvr2z58WEAxV_q2MGHZrwDdsQMygCegQIARBa..i&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fcow-field&docid=akScqRNFl4VzLM&w=612&h=408&q=scenic%20cows%20and%20fields%20wallpaper&ved=2ahUKEwiRvr2z58WEAxV_q2MGHZrwDdsQMygCegQIARBa) - Cow Image 1
- [Google Images](https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-photo%2Fcows-herd-on-grass-field-600nw-2030724431.jpg&tbnid=TJZRiYWFzHJV6M&vet=12ahUKEwiRvr2z58WEAxV_q2MGHZrwDdsQMygFegQIARBh..i&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fcow-landscape&docid=814uOoc0nRPGQM&w=600&h=399&q=scenic%20cows%20and%20fields%20wallpaper&ved=2ahUKEwiRvr2z58WEAxV_q2MGHZrwDdsQMygFegQIARBh) - Cow Image 2
- [Google Images](https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1500595046743-cd271d694d30%3Fq%3D80%26w%3D1000%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y293c3xlbnwwfHwwfHx8MA%253D%253D&tbnid=FpWkU78RfIlwXM&vet=12ahUKEwiRvr2z58WEAxV_q2MGHZrwDdsQMygNegQIARB0..i&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fcows&docid=1uXj-MMqWjutDM&w=1000&h=664&q=scenic%20cows%20and%20fields%20wallpaper&ved=2ahUKEwiRvr2z58WEAxV_q2MGHZrwDdsQMygNegQIARB0) - Cow Image 3
- [GitHub Copilot](https://github.com/features/copilot) - Answering all my programming related questions
- [GitHub](https://github.com/) - Developer Platform
  <img src="/src/assets/images/copilot.png">
- Team at Singapore General Assembly SEIF-15
