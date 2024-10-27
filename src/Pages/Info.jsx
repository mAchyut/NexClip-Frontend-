import React from "react";

function Info() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center p-6 mt-20">
      {/* Header Section */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to NexClip!</h1>
        <p className="text-gray-400 text-lg">
          Your ultimate platform for watching and managing videos.
        </p>
      </header>

      {/* Main Info Section */}
      <main className="max-w-4xl text-left space-y-10">
        {/* Section 1 - About the App */}
        <section>
          <h2 className="text-3xl font-semibold mb-3">About NexClip</h2>
          <a
            className="absolute top-20 right-20 mt-5 text-sm hover:text-gray-300 opacity-50"
            href="https://lieflog.netlify.app/post/nexclip-features-user-guide"
            target="_blank"
          >
            Blog: user guide?
          </a>
          <p className="text-gray-300 text-lg">
            NexClip is designed to provide you with an exceptional experience
            for watching, uploading, and managing videos. Whether you're a
            content creator or a casual viewer, our platform makes everything
            seamless and easy to use.
          </p>
        </section>

        {/* Section 2 - Key Features */}
        <section>
          <h2 className="text-3xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <strong>Video Upload:</strong> Effortlessly upload videos in no
              time.(up-to 100MB in free tier)
            </li>
            <li>
              <strong>Watch History:</strong> Keep track of all the videos
              you've watched with ease.
            </li>
            <li>
              <strong>Channel Management:</strong> Create and manage your own
              channel effortlessly.
            </li>
            <li>
              <strong>Secure Video Privacy:</strong> Control the visibility
              (publish/unpublish) of your videos until you&apos;re ready to
              share.
            </li>
            <li>
              <strong>End-to-End Encryption:</strong> Protect your uploads and
              API requests from unauthorized access.
            </li>
            <li>
              <strong>Role-Based Access Control:</strong> Limit editing and
              management capabilities to authorized users only.
            </li>
            <li>
              <strong>Encrypted Storage:</strong> Safeguard your videos and data
              with encryption protocols.
            </li>
            <li>
              <strong>Secure API Authentication:</strong> Ensure all API
              requests are authenticated and encrypted.
            </li>
            <li>
              <strong>Session Management:</strong> Manage active sessions to
              maintain account security.
            </li>
          </ul>
        </section>

        {/* Section 3 - How it Works */}
        <section>
          <h2 className="text-3xl font-semibold mb-3">How It Works</h2>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>
              <strong>Create an Account:</strong> Sign up or log in to start
              enjoying NexClip.
            </li>
            <li>
              <strong>Upload Videos:</strong> Visit your channel, click upload,
              and select your video files.
            </li>
            <li>
              <strong>Watch and Enjoy:</strong> Explore our library for great
              content.
            </li>
            <li>
              <strong>Track History:</strong> Easily revisit your favorite
              videos through your watch history.
            </li>
            <li>
              <strong>Manage Channel:</strong> Personalize your profile and grow
              your audience.
            </li>
          </ol>
        </section>

        {/* Section 4 - Upcoming Features */}
        <section>
          <h2 className="text-3xl font-semibold mb-3">Upcoming Features</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <strong>Video Analytics:</strong> Gain insights into viewer
              engagement.
            </li>
            <li>
              <strong>Live Streaming:</strong> Broadcast live events directly to
              your audience.
            </li>
            <li>
              <strong>Advanced Search:</strong> Quickly find videos with filters
              and keywords.
            </li>
            <li>
              <strong>Enhanced Security:</strong> Improve account and video
              protection.
            </li>
            <li>
              <strong>Private Video Sharing:</strong> Share videos privately
              with secure links.
            </li>
            <li>
              <strong>Real-time Threat Detection:</strong> Monitor for
              suspicious activity.
            </li>
            <li>
              <strong>Two-Factor Authentication (2FA):</strong> Add an extra
              layer of security to your account.
            </li>
          </ul>
        </section>

        {/* Section 5 - Support */}
        <section>
          <h2 className="text-3xl font-semibold mb-3">Need Help?</h2>
          <p className="text-gray-300 text-lg">
            For support or inquiries, reach out to our team at{" "}
            <a
              href="mailto:nexcliphelp@gmail.com"
              className="text-blue-500 hover:text-blue-400"
            >
              NexCliphelp@gmail.com
            </a>
            .
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-500">
        <p>&copy; 2024 NexClip. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Info;
