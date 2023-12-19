# Books MVP

1. **Ticket #101 - Code Documentation Enhancement**

   - **User Story**: As a developer, I want to have clear comments on each function, so that I can understand the codebase more quickly and maintain it efficiently.
   - **Task**: Add descriptive comments to each function across the codebase to enhance readability and facilitate easier maintenance.

2. **Ticket #102 - Refactor Books.js to Use Custom Hook**

   - **User Story**: As a developer, I want to use the `useAxios` custom hook in `Books.js` to streamline HTTP requests, ensuring a consistent approach to data fetching.
   - **Task**: Replace the current `axios.get` function in `Books.js` with the `useAxios` custom hook without altering the existing functionality.

3. **Ticket #103 - Implement Search in Books.js**

   - **User Story**: As a user, I want to search for books by title, author, or genre, so that I can find specific books more easily in the application.
   - **Task**: Add a search feature in `Books.js` to enable users to filter and find books based on various criteria.

4. **Ticket #104 - Fix Message Display Timing in AddBook.js**

   - **User Story**: As a user, I want to clearly see success or error messages for a sufficient amount of time, so that I can understand the outcome of my actions.
   - **Task**: Modify `AddBook.js` to ensure that success/error messages are displayed for the full 5000 milliseconds as defined in the `useAxios` hook.

5. **Ticket #105 - Image URL Fallback Implementation**

   - **User Story**: As a user, I want to see a default image for books where no image URL is provided, so that the user interface remains consistent and visually appealing.
   - **Task**: Implement a check in `AddBook.js` to use a default image when a user does not provide an image URL.

6. **Ticket #106 - Develop SinglePage Component**
   - **6.1. User Story (Route and Links)**: As a user, I want to navigate to a detailed page for each book, so I can view more information about it.
     - **Task**: Set up a new route and navigation links for the `SinglePage` component.
   - **6.2. User Story (Styling Consistency)**: As a user, I expect the SinglePage component to have a consistent look and feel with the rest of the application for a seamless experience.
     - **Task**: Use Material-UI for designing the `SinglePage` component, ensuring it aligns with the existing style of the application.
