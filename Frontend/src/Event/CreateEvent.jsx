import { Link } from "react-router-dom";

const CreateEvent = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-background text-foreground py-12">
      <div className="max-w-screen-2xl px-4 md:px-8">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-gray-light ring-purple-400 hover:bg-secondary focus-visible:ring active:text-foreground md:text-base lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Menu
        </button>
        <section className="flex flex-col justify-between gap-8 sm:gap-10 md:gap-12 lg:flex-row bg-primary rounded-lg shadow-lg overflow-hidden w-full h-[700px]">
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12 xl:w-7/12">
            <p className="mb-4 font-semibold text-purple-400 md:mb-6 md:text-lg xl:text-xl">
              Thinking about hosting an event?
            </p>
            <h1 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl md:mb-8 md:text-5xl">
              Create your event and share it with the world
            </h1>
            <p className="mb-6 leading-relaxed text-gray-light md:mb-8 lg:w-4/5 xl:text-lg">
              Easily create, manage and promote your event. Share it with the
              world and reach a wider audience. Start now and take your event to
              the next level.
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/start-event"
                className="px-6 py-3 text-sm font-semibold text-foreground bg-purple-500 rounded-lg shadow-lg hover:bg-purple-600 hover:shadow-purple-500/25 focus:outline-none focus:ring focus:ring-purple-400 active:bg-purple-600 transition-all duration-200"
              >
                Start Event
              </Link>
            </div>
          </div>
          <div className="relative w-full lg:w-5/12">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1486591978090-58e619d37fe7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              loading="lazy"
              alt="Event Creation"
              className="h-full w-full object-cover object-center brightness-90"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateEvent;
