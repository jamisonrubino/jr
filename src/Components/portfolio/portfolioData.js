export default {
  portfolioPieces: [
    {
      name: "TravelTracks",
      blurbs: [
        "To use TravelTracks, you need to authenticate yourself with Spotify, granting TravelTracks the right to create and modify playlists for you.",
        "To create your playlist, enter the length of your road trip, or calculate your travel time by car with Google Maps Directions. Next, choose the source of your playlist’s music: recommendations based on up to three genre choices, recommendations based on an artist, your 300 most-recent saved tracks, or your top 50 most-played tracks for the last 6 months.",
        "You are redirected to a page with a Spotify plugin where you can browse and play your playlist.",
        "You can browse all of your TravelTracks playlists by following “My Playlists” in the navigation bar."
      ],
      summary:
        "My capstone project for Bloc’s Part-Time Web Developer bootcamp: a Ruby-on-Rails-based app that builds you the perfect playlist for your road trip.",
      slug: "traveltracks",
      style: {
        backgroundImage: "url('/img/portfolio/traveltracks/img/cover.jpg')",
        backgroundSize: "cover"
      },
      demo: "http://traveltracks.jamisonrubino.com",
      source: "https://github.com/jamisonrubino/traveltracks"
    },
    {
      name: "LetteredHorizon",
      blurbs: [
        "The home page shows the most recent posts of all categories.",
        "Each category has its own page and displays its most recent posts.",
        "The register form dynamically checks your username's availability, password vailidity and password matching. On submit, you are emailed an activation code you need to enter before you can post.",
        "I logged in!",
        "Once logged in, posts you authored show an edit link.",
        "You can edit posts you authored and create new posts with this basic posting form."
      ],
      summary:
        "My first attempt at PHP user validation and blogging. Left unfinished in 2015 and revived in 2018.",
      slug: "letteredhorizon",
      style: {
        backgroundImage: "url('/img/portfolio/letteredhorizon/img/cover.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      demo: "https://letteredhorizon.com",
      source: "https://github.com/jamisonrubino/letteredhorizon"
    },
    {
      name: "BlocJams",
      blurbs: [
        "Bloc Jam's landing page.",
        "Collection: a list of albums in the database. For lack of album data, I looped the three albums provided, but the library is scalable.",
        "Album/:id shows the track list with play/pause buttons and a working player bar (with prev/play/pause/next buttons, a working seek bar, and volume slider)."
      ],
      summary:
        "Bloc students, to practice JavaScript and jQuery, and to introduce AngularJS, build a simple Spotify-style music library with the Buzz engine.",
      slug: "blocjams",
      style: {
        backgroundImage: "url('/img/portfolio/blocjams/img/cover.jpg')",
        backgroundSize: "cover"
      },
      demo: "http://blocjams.jamisonrubino.com",
      source: "https://github.com/jamisonrubino/bloc-jams-angular"
    },
    {
      name: "BlocChat",
      blurbs: [
        "For starters, we needed a Firebase database to store our rooms. From that, we fetch an array of room names and display them as links in our sidebar. To add rooms to the rooms database, we add a button next to the “Bloc Chat” title, which opens a modal dialog box (thanks, Bootstrap!), which triggers a function uploading our text to the rooms database.",
        "With our rooms set up, we needed to populate them with messages. Heading back to Firebase, we set up our messages database table, each child of which holds four object items: room ID, time, username, and message content. Now, each message submission notes the current room, time, and message content.",
        "For this to be a proper chatroom app, we needed messages to be associated with usernames, so when the site loads, a modal appears to let the user choose their own username. Now users can revisit the app for their messaging needs."
      ],
      summary:
        "Bloc students, to practice JQuery, Angular, Firebase, and Bootstrap, build a single-page chatroom app that allows users to register, visit existing chatrooms, create new chatrooms, and post in them.",
      slug: "blocchat",
      style: {
        backgroundImage: `url('/img/portfolio/blocchat/img/cover.jpg')`,
        backgroundSize: "cover"
      },
      demo: "http://blocchat.jamisonrubino.com",
      source: "https://github.com/jamisonrubino/bloc-chat"
    }
  ]
};
