import { Head, Link } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ExcelReportButton from "./ExcelReportButton";

const defaultValues = {
    ocde: "",
    ods: "",
    q: "",
    index_base: "",
    country: "",
    apc: "",
    status: "",
    publication: "",
};

export const index_bases = [
    { id: "DOAJ-Dynamed", name: "DOAJ-Dynamed" },
    { id: "EBSCO", name: "EBSCO" },
    { id: "IEE", name: "IEE" },
    { id: "IOPSCIENCE", name: "IOPSCIENCE" },
    { id: "LATINDEX", name: "LATINDEX" },
    { id: "SAGE", name: "SAGE" },
    { id: "SCIENCEDIRECT", name: "SCIENCEDIRECT" },
    { id: "REDALYC", name: "REDALYC" },
    { id: "SCIELO", name: "SCIELO" },
    { id: "SCOPUS", name: "SCOPUS" },
    { id: "WILEY", name: "WILEY" },
    { id: "OTRA", name: "OTRA" },
];

export const qs = [
    { id: "Q1", name: "Q1" },
    { id: "Q2", name: "Q2" },
    { id: "Q3", name: "Q3" },
    { id: "Q4", name: "Q4" },
    { id: "sin Q", name: "sin Q" },
];

export default function Index(props) {
    const { manuscripts, ocdes, odss, countries } = props;
    const [odsOptions, setOdsOptions] = useState(odss);
    const [ocdeOptions, setOcdeOptions] = useState(ocdes);
    const [searchFilters, setSearchFilters] = useState({ ...defaultValues });
    const odsSelect = useRef();
    const ocdeSelect = useRef();

    const handleClean = () => {
        setSearchFilters({ ...defaultValues });
    };

    const handleSearch = (e) => {
        setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
    };

    let data = manuscripts.filter((manuscript) => {
        const ocdeMatch = !searchFilters.ocde
            ? true
            : manuscript.ocde.some((ocde) => ocde.id == searchFilters.ocde);
        const odsMatch = !searchFilters.ods
            ? true
            : manuscript.ods.some((ods) => ods.id == searchFilters.ods);
        const qsMatch = !searchFilters.q
            ? true
            : manuscript.q == searchFilters.q;
        const indexBaseMatch = !searchFilters.index_base
            ? true
            : manuscript.index_base == searchFilters.index_base;
        const countryMatch = !searchFilters.country
            ? true
            : manuscript.country.id == searchFilters.index_base;
        const apcMatch =
            searchFilters.apc === ""
                ? true
                : manuscript.apc_value
                      .toLowerCase()
                      .includes(searchFilters.apc.toLowerCase());
        const statusMatch =
            searchFilters.status === ""
                ? true
                : manuscript.status == searchFilters.status;
        return (
            ocdeMatch &&
            odsMatch &&
            qsMatch &&
            indexBaseMatch &&
            countryMatch &&
            apcMatch &&
            statusMatch
        );
    });

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength - 3) + "...";
        }
        return text;
    };

    useEffect(() => {
        const handleResize = () => {
            if (odsSelect.current) {
                const selectWidth3 = odsSelect.current.offsetWidth;
                const chars3 = Math.floor(selectWidth3 / 6.9);
                const arrayConNuevaClave3 = odsOptions.map((objeto) => ({
                    ...objeto,
                    truncatedText: truncateText(
                        objeto.name + " - " + objeto.description,
                        chars3
                    ),
                }));
                setOdsOptions(arrayConNuevaClave3);
            }
            if (ocdeSelect.current) {
                const selectWidth4 = ocdeSelect.current.offsetWidth;
                const chars4 = Math.floor(selectWidth4 / 6.9);
                const arrayConNuevaClave4 = ocdeOptions.map((objeto) => ({
                    ...objeto,
                    truncatedText: truncateText(
                        objeto.code + " - " + objeto.name,
                        chars4
                    ),
                }));
                setOcdeOptions(arrayConNuevaClave4);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Buscador de Manuscritos
                </h2>
            }
        >
            <Head title="Manuscritos" />
            <div className="py-6 mx-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-4 inline-flex w-full overflow-hidden rounded-lg bg-white shadow-md">
                        <div className="flex items-center justify-center bg-blue-500">
                            <svg
                                className="h-6 w-6 fill-current text-white"
                                viewBox="0 0 40 40"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"></path>
                            </svg>
                        </div>

                        <div className="px-4 flex-grow">
                            <div className="border-b border-gray-900/10 pb-2">
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                                    <div>
                                        <label
                                            htmlFor="ocde"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            OCDE
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                value={searchFilters.ocde}
                                                ref={ocdeSelect}
                                                id="ocde"
                                                name="ocde"
                                                onChange={handleSearch}
                                                className="block w-full rounded-md border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="">
                                                    Seleccionar todos
                                                </option>
                                                {ocdeOptions.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.truncatedText}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="ods"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            ODS
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                value={searchFilters.ods}
                                                ref={odsSelect}
                                                id="ods"
                                                name="ods"
                                                onChange={handleSearch}
                                                className="block w-full rounded-md border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="">
                                                    Seleccionar todos
                                                </option>
                                                {odsOptions.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.truncatedText}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="q"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Índice Q
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                onChange={handleSearch}
                                                value={searchFilters.q}
                                                id="q"
                                                name="q"
                                                className="block w-full rounded-md border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="">
                                                    Seleccionar todos
                                                </option>
                                                {qs.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="index_base"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Bases de datos
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                value={searchFilters.index_base}
                                                id="index_base"
                                                name="index_base"
                                                onChange={handleSearch}
                                                className="block w-full rounded-md border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="">
                                                    Seleccionar todos
                                                </option>
                                                {index_bases.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Estado de llamada
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                value={searchFilters.status}
                                                onChange={handleSearch}
                                                className="block w-full rounded-md border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-indigo-600 sm:text-sm"
                                                name="status"
                                            >
                                                <option value="">Todos</option>
                                                <option value={1}>
                                                    Vigente
                                                </option>
                                                <option value={0}>
                                                    No Vigente
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="apc"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Valor APC
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                value={searchFilters.apc}
                                                type="text"
                                                id="apc"
                                                onChange={handleSearch}
                                                name="apc"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="country"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            País
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                onChange={handleSearch}
                                                value={searchFilters.country}
                                                id="country"
                                                name="country"
                                                className="block w-full rounded-md border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="">
                                                    Seleccionar todos
                                                </option>
                                                {countries.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div className="col-span-2 flex items-center justify-end">
                                        <p className="mr-3 text-sm text-gray-500">{`(${
                                            data.length ? data.length : 0
                                        } registros)`}</p>
                                        <ExcelReportButton data={data} />
                                        <button
                                            onClick={handleClean}
                                            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Limpiar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                        Institución
                                    </th>
                                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                        Nombre Convocatoria
                                    </th>
                                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 hidden sm:table-cell">
                                        Fecha de Inicio
                                    </th>
                                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 hidden sm:table-cell">
                                        Fecha de Fin
                                    </th>
                                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 hidden sm:table-cell">
                                        Estado
                                    </th>
                                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                        Más
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((manuscript) => (
                                    <tr
                                        key={manuscript.id}
                                        className="text-gray-700"
                                    >
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {manuscript.institution}
                                            </p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {manuscript.name}
                                            </p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm hidden sm:table-cell">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {manuscript.start_date}
                                            </p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm hidden sm:table-cell">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {manuscript.end_date}
                                            </p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm hidden sm:table-cell">
                                            <input
                                                type="checkbox"
                                                checked={manuscript.status == 1}
                                                disabled
                                                className="mr-1"
                                            />
                                        </td>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <Link
                                                className="text-blue-600 underline whitespace-no-wrap hover:text-gray-900"
                                                href={route(
                                                    "manuscripts.show",
                                                    { id: manuscript.id }
                                                )}
                                            >
                                                Información
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
