import SignIn from "@/components/ui/sign-in";

const page = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(/streamer-hero.jpg)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Unlimited movies, TV shows, and more</h1>
          <p className="mb-5">
            Ready to watch? Signin with google to create or restart your membership.
          </p>
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default page;
