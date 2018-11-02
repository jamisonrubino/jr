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
        "Bloc Jams consists of a landing page, album list, and album song list with a functional music player, which plays, pauses and skips tracks, tracking play progress with a working seek bar.",
        "For lack of song and album work, we loaded 12 iterations of the same album in the Collection page, but a richer body of album templates would load if more were added to the catalog data.",
        "With album and song data retrieved, we attach event handlers to each song row in the album song list, so play buttons appear on hover, and toggle between play/pause when clicked. When a song plays, the player bar updates with the song’s name, artist, album, total time and time elapsed. The player bar also allows you to seek by dragging the seek thumb to your desired time, just as the volume slider allows you to set the current volume."
      ],
      summary:
        "Bloc students, to practice Javascript and JQuery, and to introduce AngularJS, build a simple Spotify-style music library with the Buzz engine.",
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
