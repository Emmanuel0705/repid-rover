import { ActionFunctionArgs, Link, useSubmit } from 'react-router-dom'
import { IFormData } from '../interfaces'
import APIManager from '../api/article'
import { toastError, toastSuccess } from '../components/Toast'
import { ToastContainer } from 'react-toastify'
import { Form, redirect, json, useActionData } from 'react-router-dom'
import { assert, object, string, nonempty, StructError } from 'superstruct'
import Input from '../components/Input'

const articleSchema = object({
    title: nonempty(string()),
    content: nonempty(string()),
    authorName: nonempty(string()),
    name: nonempty(string()),
    email: nonempty(string()),
    phone: nonempty(string()),
})

export const action = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData()

    const formToJSON: any = {}
    for (const [key, value] of [...form.entries()]) {
        formToJSON[key] = value
    }

    try {
        assert(formToJSON, articleSchema)
        const { name, phone, email, authorName, content, title } = formToJSON
        const payload: IFormData = {
            authorName,
            content,
            title,
            attorney: { name, phone, email },
        }

        const res = await new APIManager().createArticle(payload)
        if (res.success) {
            toastSuccess('Created Successfully')
        } else toastError('Failed')
    } catch (err) {
        if (err instanceof StructError) {
            const fieldsErrors = err.failures().reduce(
                (acc, { key, message }) => ({
                    ...acc,
                    [key]: message,
                }),
                {}
            )
            return json(fieldsErrors)
        }
        console.error(err)
    }

    window.location.reload()
    return redirect('/create-article')
}

const CreateArticle = () => {
    const actionData: any = useActionData()

    return (
        <>
            <ToastContainer />

            <nav className="bg-white  fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4">
                    <Link
                        to="/"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
                    >
                        Search Article
                    </Link>
                </div>
            </nav>
            {/* <Form>
                <div className="relative overflow-hidden">
                    <form onSubmit={handleSubmit}>
                        <div className="max-w-[72rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
                            <div className="mt-5 bg-white rounded-lg shadow-md">
                                <div className="flex">
                                    <div className="flex-1 py-5 pl-5 overflow-hidden">
                                        <h1 className="inline text-2xl font-semibold leading-none">
                                            Article Informations
                                        </h1>
                                    </div>
                                </div>
                                <div className="px-5 pb-5">
                                    <div className="flex">
                                        <div className="flex-grow pr-2">
                                            <input
                                                value={formData.title}
                                                required
                                                onChange={handleArticleChange}
                                                name="title"
                                                placeholder="Title"
                                                className="  w-full px-4 py-3 mt-5 text-base outline-gray-200 rounded-lg bg-gray-200 "
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <input
                                                value={formData.authorName}
                                                name="authorName"
                                                onChange={handleArticleChange}
                                                placeholder="Author's Name"
                                                className="w-full px-4 py-3 mt-5 text-base outline-gray-200 rounded-lg bg-gray-200"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-1">
                                        <textarea
                                            value={formData.content}
                                            name="content"
                                            onChange={handleArticleChange}
                                            rows={8}
                                            className="w-full px-4 py-3 mt-5 text-base outline-gray-200 rounded-lg bg-gray-200"
                                            placeholder="Content"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-1 py-5 pl-5 overflow-hidden">
                                        <h1 className="inline text-2xl font-semibold leading-none">
                                            Attorney Informations
                                        </h1>
                                    </div>
                                </div>

                                <div className="px-5 pb-5">
                                    <input
                                        onChange={handleAttorneyChange}
                                        name="name"
                                        value={formData.attorney?.name}
                                        placeholder="Attorney's Name"
                                        className=" w-full px-4 py-3 mt-5 text-base outline-gray-200 rounded-lg bg-gray-200   "
                                    />

                                    <div className="flex">
                                        <div className="flex-grow pr-2">
                                            <input
                                                value={formData.attorney?.email}
                                                name="email"
                                                type="email"
                                                onChange={handleAttorneyChange}
                                                placeholder="Email Address"
                                                className="w-full px-4 py-3 mt-5 text-base outline-gray-200 rounded-lg bg-gray-200"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <input
                                                value={formData.attorney?.phone}
                                                onChange={handleAttorneyChange}
                                                name="phone"
                                                placeholder="Phone Number"
                                                className="  w-full px-4 py-3 mt-5 text-base outline-gray-200 rounded-lg bg-gray-200 "
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-4" />
                                <div className="flex flex-row-reverse p-3">
                                    <div className="flex-initial pl-3">
                                        <input
                                            type="submit"
                                            className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Form> */}

            <Form method="post">
                <div className="relative overflow-hidden">
                    <div className="max-w-[72rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
                        <div className="mt-5 bg-white rounded-lg shadow-md">
                            <div className="flex">
                                <div className="flex-1 py-5 pl-5 overflow-hidden">
                                    <h1 className="inline text-2xl font-semibold leading-none">
                                        Article Informations
                                    </h1>
                                </div>
                            </div>
                            <div className="px-5 pb-5">
                                <div className="flex">
                                    <div className="flex-grow pr-2">
                                        <Input
                                            name="title"
                                            placeholder="Title"
                                            error={actionData?.title}
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <Input
                                            name="authorName"
                                            placeholder="Author's Name"
                                            error={actionData?.authorName}
                                        />
                                    </div>
                                </div>
                                <div className="p-1">
                                    <textarea
                                        name="content"
                                        rows={8}
                                        className={`w-full px-4 py-3 bg-gray-200 mt-5 text-base  rounded-lg   border  ${actionData?.content ? 'border-red-600 outline-red-500' : 'outline-none'} `}
                                        placeholder="Content"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 py-5 pl-5 overflow-hidden">
                                    <h1 className="inline text-2xl font-semibold leading-none">
                                        Attorney Informations
                                    </h1>
                                </div>
                            </div>

                            <div className="px-5 pb-5">
                                <Input
                                    name="name"
                                    placeholder="Attorney's Name"
                                    error={actionData?.name}
                                />

                                <div className="flex">
                                    <div className="flex-grow pr-2">
                                        <Input
                                            name="email"
                                            type="email"
                                            placeholder="Email Address"
                                            error={actionData?.email}
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <Input
                                            name="phone"
                                            placeholder="Phone Number"
                                            error={actionData?.phone}
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-4" />
                            <div className="flex flex-row-reverse p-3">
                                <div className="flex-initial pl-3">
                                    <input
                                        type="submit"
                                        className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default CreateArticle
