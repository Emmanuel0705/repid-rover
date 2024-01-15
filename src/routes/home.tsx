import {
    Form,
    Link,
    LoaderFunctionArgs,
    useLoaderData,
    useNavigation,
} from 'react-router-dom'
import APIManager from '../api/article'
import { IArticles } from '../interfaces'
import { FC } from 'react'
import Loader from '../components/Loader'

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const search = url.searchParams.get('search')
    const articles = await new APIManager().searchArticles(search)

    return articles
}

const Home: FC = () => {
    const articles = useLoaderData() as [IArticles]
    const navigation = useNavigation()

    return (
        <>
            {navigation.state === 'loading' && <Loader />}
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4">
                    <Link
                        to="/create-article"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Create Article
                    </Link>
                </div>
            </nav>

            <div className="relative overflow-hidden">
                <div className="max-w-[72rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
                    <div className="text-center">
                        <p className="mt-3 text-gray-600 ">
                            Search your favourite articles
                        </p>

                        <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                            <Form role="search" id="search-form">
                                <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 ">
                                    <div className="flex-[1_0_0%]">
                                        <label
                                            htmlFor="hs-search-article-1"
                                            className="block text-sm text-gray-700 font-medium "
                                        >
                                            <span className="sr-only">
                                                Search article
                                            </span>
                                        </label>
                                        <input
                                            type="search"
                                            name="search"
                                            id="hs-search-article-1"
                                            className="py-2.5 px-4 block w-full  outline-none rounded-lg "
                                            placeholder="Search article"
                                        />
                                    </div>
                                    <div className="flex-[0_0_auto]">
                                        <button
                                            type="submit"
                                            className="w-[46px] h-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none "
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="flex justify-center mt-14 bg-white ">
                        <div className="space-y-6 border-l-2 border-dashed">
                            {articles.length ? (
                                <>
                                    {articles.map((e: IArticles) => (
                                        <div
                                            key={e.title}
                                            className="relative w-full"
                                        >
                                            <div className="ml-6">
                                                <h4 className="font-bold text-blue-500">
                                                    {e.title}
                                                </h4>
                                                <p className="mt-2 max-w-screen-sm text-sm text-gray-500">
                                                    {e.body}
                                                </p>
                                                <span className="mt-1 block text-sm font-semibold text-blue-500">
                                                    2007
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <h1 className="text-gray-500 text-xl font-bold">
                                    No content
                                </h1>
                            )}
                        </div>
                    </div>{' '}
                </div>
            </div>
        </>
    )
}

export default Home
