import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Spinner } from '../components/Spinner';

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitted },
  } = useForm();

  const [query, setQuery] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/search?q=${query}`);
      const posts = await res.json();
      return posts;
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoading, error, data } = useQuery('search', () => fetchPosts(), {
    enabled: isSubmitted,
  });

  const onSubmit = async ({ query }) => {
    setQuery(query);
    reset();
  };

  return (
    <div>
      <Head>
        <title>Full-Text Search</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container mx-auto my-10">
        <h1 className="text-center text-4xl font-medium mb-5">
          Full-Text Search using Prisma
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 px-8 sm:mx-auto sm:max-w-lg sm:flex"
        >
          <div className="min-w-0 flex-1">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              {...register('query', { required: true })}
              type="text"
              className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              placeholder="Search"
            />
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-3">
            <button
              type="submit"
              className="block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
            >
              Search
            </button>
          </div>{' '}
        </form>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 my-12 gap-10">
            {data?.results.length === 0 ? (
              <p>There are no results that match your query</p>
            ) : (
              data?.results.map((post) => (
                <div
                  className="shadow p-3 rounded-lg flex flex-col space-y-2"
                  key={post.id}
                >
                  <h2 className="text-lg font-medium">{post.title}</h2>
                  <p className="text-base">{post.body}</p>
                  <p className="text-sm text-gray-500">{post.status}</p>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
}
