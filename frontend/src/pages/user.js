import fetch from "isomorphic-unfetch";
import Layout from "../components/Layout";

import { UserContext } from "./_app";

export default function UserPage({
  posts = [
    {
      id: "222",
      title: "First Blog Post",
      date: new Date().toDateString(),
      description: ` The basic blog page layout is available and all using the default
Tailwind CSS classes (although there are a few hardcoded style
tags). If you are going to use this in your project, you will want
to convert the classes into components.`
    }
  ],
  id
}) {
  const userCtx = React.useContext(UserContext);
  React.useEffect(() => {
    userCtx.setUserId(id);
  }, []);

  console.log({ id });
  return (
    <Layout>
      <div className="bg-gray-100 font-sans leading-normal tracking-normal">
        <div className="container w-full md:max-w-3xl mx-auto pt-20">
          {posts.map(post => (
            <div
              className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal"
              style={{ fontFamily: "Georgia,serif" }}
              key={`${post.title}`}
            >
              <div className="font-sans">
                <span className="text-base md:text-sm text-teal-500 font-bold">
                  &lt;
                  <span>
                    {" "}
                    <a
                      href="#"
                      className="text-base md:text-sm text-teal-500 font-bold no-underline hover:underline"
                    >
                      BACK TO BLOG
                    </a>
                    <p />
                    <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
                      {post.title}
                    </h1>
                    <p className="text-sm md:text-base font-normal text-gray-600">
                      {post.date}
                    </p>
                  </span>
                </span>
              </div>
              <p className="py-6">{post.description}</p>
            </div>
          ))}
          <hr className="border-b-2 border-gray-400 mb-8 mx-4" />
          <div className="container px-4">
            <div className="font-sans bg-white rounded-lg shadow-md p-4 text-center">
              <h2 className="font-bold break-normal text-xl md:text-3xl">
                Subscribe to my Newsletter
              </h2>
              <h3 className="font-bold break-normal font-normal text-gray-600 text-sm md:text-base">
                Get the latest posts delivered right to your inbox
              </h3>
              <div className="w-full text-center pt-4">
                <form action="#">
                  <div className="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                    <input
                      type="email"
                      placeholder="youremail@example.com"
                      className="flex-1 mt-4 appearance-none border border-gray-400 rounded shadow-md p-3 text-gray-600 mr-2 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="flex-1 mt-4 block md:inline-block appearance-none bg-teal-500 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-teal-400"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center font-sans px-4 py-12">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src="http://i.pravatar.cc/300"
              alt="Avatar of Author"
            />
            <div className="flex-1 px-2">
              <p className="text-base font-bold text-base md:text-xl leading-none mb-2">
                Jo Bloggerson
              </p>
              <p className="text-gray-600 text-xs md:text-base">
                Minimal Blog Tailwind CSS template by{" "}
                <a
                  className="text-teal-500 no-underline hover:underline"
                  href="https://www.tailwindtoolbox.com"
                >
                  TailwindToolbox.com
                </a>
              </p>
            </div>
            <div className="justify-end">
              <button className="bg-transparent border border-gray-500 hover:border-teal-500 text-xs text-gray-500 hover:text-teal-500 font-bold py-2 px-4 rounded-full">
                Read More
              </button>
            </div>
          </div>
          <hr className="border-b-2 border-gray-400 mb-8 mx-4" />
          <div className="font-sans flex justify-between content-center px-4 pb-12">
            <div className="text-left">
              <span className="text-xs md:text-sm font-normal text-gray-600">
                &lt; Previous Post
              </span>
              <br />
              <p>
                <a
                  href="#"
                  className="break-normal text-base md:text-sm text-teal-500 font-bold no-underline hover:underline"
                >
                  Blog title
                </a>
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs md:text-sm font-normal text-gray-600">
                Next Post &gt;
              </span>
              <br />
              <p>
                <a
                  href="#"
                  className="break-normal text-base md:text-sm text-teal-500 font-bold no-underline hover:underline"
                >
                  Blog title
                </a>
              </p>
            </div>
          </div>
        </div>
        <footer className="bg-white border-t border-gray-400 shadow">
          <div className="container max-w-4xl mx-auto flex py-8">
            <div className="w-full mx-auto flex flex-wrap">
              <div className="flex w-full md:w-1/2 ">
                <div className="px-8">
                  <h3 className="font-bold text-gray-900">About</h3>
                  <p className="py-4 text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas vel mi ut felis tempus commodo nec id erat.
                    Suspendisse consectetur dapibus velit ut lacinia.
                  </p>
                </div>
              </div>
              <div className="flex w-full md:w-1/2">
                <div className="px-8">
                  <h3 className="font-bold text-gray-900">Social</h3>
                  <ul className="list-reset items-center text-sm pt-3">
                    <li>
                      <a
                        className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1"
                        href="#"
                      >
                        Add social link
                      </a>
                    </li>
                    <li>
                      <a
                        className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1"
                        href="#"
                      >
                        Add social link
                      </a>
                    </li>
                    <li>
                      <a
                        className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1"
                        href="#"
                      >
                        Add social link
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}

UserPage.getInitialProps = async ({ query }) => {
  let posts = undefined;

  try {
    const result_posts = await (
      await fetch("http://node-prod:5000/api/posts", {
        method: "POST",
        body: JSON.stringify({ user_id: query.id })
      })
    ).json();
    posts = result_posts;
  } catch (error) {}

  return { posts: undefined, id: query.id };
};
