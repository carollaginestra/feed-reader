/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against application.
 */
$(function() {

    describe('RSS Feeds', () => {

        /* tests to make sure that the allFeeds
         * variable has been defined and that it is not empty
         */
        it('should be defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url should not be empty', () => {
            for (let feed of allFeeds) {
                expect(feed.url).toBeTruthy();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* Test that loops through each feed in the allFeeds
         * object and ensures it has a name defined and that the
         * name is not empty.
         */
        it('name should not be empty', () => {
            for (let feed of allFeeds) {
                expect(feed.name).toBeTruthy();
                expect(feed.name.length).not.toBe(0);
            } 
        });

    });


    describe('The menu', () => {

        const body = document.querySelector('body');

        /* test that ensures the menu element is hidden by default */
        it('should be hidden', () => {
            expect(body.classList).toContain('menu-hidden');
        });

        /* test that ensures the menu changes visibility
         * when the menu icon is clicked.
         */
        it('should change the visibility', () => {
            const menu = document.querySelector(".menu-icon-link");

            menu.click();
            expect(body.classList).not.toContain('menu-hidden');
            menu.click();
            expect(body.classList).toContain('menu-hidden');

        });
    });

    
    describe('Initial Entries', () => {

        /* test that ensures when the loadFeed
         * function is called and completes its work
         */

        beforeEach((done) => {
            loadFeed(0, done);
        });

        it('should be done', () => {
            const feedDiv = document.querySelectorAll(".feed .entry");
            expect(feedDiv.length > 0).toBe(true);
        });

    });

    describe('New Feed Selection', () => {

        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        let feed;

        beforeEach((done) => {
            loadFeed(0, () => {
                feed = document.querySelector('.feed').innerHTML;
                loadFeed(1, () => {
                    done();
                })
            });
        });
        
        it('should be loaded', (done) => {
            const newFeed = document.querySelector('.feed').innerHTML;
            expect(newFeed).not.toBe(feed);
            done();
        });
    });

}());
