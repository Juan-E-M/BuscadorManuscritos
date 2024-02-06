import { Head, router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";
import { index_bases, qs } from "./Index";

export const types = [
    { id: "artículo original", name: "artículo original" },
    { id: "revisión sistemática", name: "revisión sistemática" },
    { id: "carta al editor", name: "carta al editor" },
    { id: "articulo de caso", name: "articulo de caso" },
    { id: "carta de opinión", name: "carta de opinión" },
];

export default function ContestableFundCreate(props) {
    const { ocdes, odss, countries } = props;
    const [enableApc , setEnableApc] = useState(false)
    const initialState = {
        institution: "",
        name: "",
        summary: "",
        type: "",
        apc: "1",
        apc_value: "",
        q: "",
        index_base: "",
        start_date: "",
        end_date: "",
        status: "1",
        link: "",
        ods: [],
        ocde: [],
        country: "",
    };
    const [formData, setFormData] = useState({ ...initialState });


    const handleChange2 = (event) => {
        const { name, options } = event.target;
        const selectedValues = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value);

        setFormData((prevData) => ({
            ...prevData,
            [name]: selectedValues,
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name=='apc' && value == 0) {
            setEnableApc(true)
            setFormData((prevData) => ({
                ...prevData,
                apc_value: '',
            }));
        } else if (name=='apc' && value == 1) {
            setEnableApc(false)
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submit = () => {
        event.preventDefault();
        const formData1 = new FormData();
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                const value = formData[key];
                if (Array.isArray(value)) {
                    value.forEach((val, index) => {
                        formData1.append(`${key}[${index}]`, val);
                    });
                } else {
                    formData1.append(key, value);
                }
            }
        }
        router.post("/manuscripts-store", formData1, {
            onSuccess: () => {
                setFormData({ ...initialState });
                return Swal.fire({
                    title: "Registro realizado",
                    text: "Nuevo manuscrito añadido",
                    icon: "success",
                });
            },
            onError: () => {
                return Swal.fire({
                    icon: "Error",
                    title: "Oops...",
                    text: "Algo salió mal",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Registrar Manuscrito
                </h2>
            }
        >
            <Head title="Registro Manuscrito" />
            <div className="py-6 mx-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">
                                    Organización o Institución
                                </h2>
                                <input
                                    required
                                    autoFocus={false}
                                    value={formData.institution}
                                    onChange={handleChange}
                                    type="text"
                                    id="institution"
                                    name="institution"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Llenado de los detalles.
                                </p>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Nombre de la Revista
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="summary"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Descripción de la Revista
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                required
                                                value={formData.summary}
                                                onChange={handleChange}
                                                id="summary"
                                                name="summary"
                                                rows="4"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="type"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Tipo de manuscrito
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                value={formData.type}
                                                onChange={handleChange}
                                                id="type"
                                                name="type"
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="" disabled>
                                                    Selecciona un tipo
                                                </option>
                                                {types.map((item) => (
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
                                            htmlFor="q"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Índice Q
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                value={formData.q}
                                                onChange={handleChange}
                                                id="q"
                                                name="q"
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="" disabled>
                                                    Selecciona un país
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
                                </div>
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="apc"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            APC
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                value={formData.apc}
                                                onChange={handleChange}
                                                id="apc"
                                                name="apc"
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="1">Si</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="apc_value"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Valor APC
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                disabled={enableApc}
                                                value={formData.apc_value}
                                                onChange={handleChange}
                                                type="text"
                                                id="apc_value"
                                                name="apc_value"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="index_base"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Base Indexada
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                value={formData.index_base}
                                                onChange={handleChange}
                                                id="index_base"
                                                name="index_base"
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="" disabled>
                                                    Selecciona una
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
                                                value={formData.country}
                                                onChange={handleChange}
                                                id="country"
                                                name="country"
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="" disabled>
                                                    Selecciona un país
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
                                    <div></div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="ocde"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Área de Conocimiento OCDE
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                multiple
                                                value={formData.ocde}
                                                id="ocde"
                                                name="ocde"
                                                onChange={handleChange2}
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="" disabled>
                                                    Select multiple ocde
                                                    (ctrl+click)
                                                </option>
                                                {ocdes.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.code} -{" "}
                                                        {item.name}
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
                                            ODS (Objetivo de Desarrollo
                                            Sostenible)
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                multiple
                                                value={formData.ods}
                                                id="ods"
                                                name="ods"
                                                onChange={handleChange2}
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="" disabled>
                                                    Select multiple ods
                                                    (ctrl+click)
                                                </option>
                                                {odss.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name} -{" "}
                                                        {item.description}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="start_date"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Fecha de Inicio
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                required
                                                value={formData.start_date}
                                                onChange={handleChange}
                                                type="date"
                                                id="start_date"
                                                name="start_date"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="end_date"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Fecha de Fin
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                required
                                                value={formData.end_date}
                                                onChange={handleChange}
                                                type="date"
                                                id="end_date"
                                                name="end_date"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="status"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Estado de Llamada
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                value={formData.status}
                                                onChange={handleChange}
                                                id="status"
                                                name="status"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value="1">
                                                    Active
                                                </option>
                                                <option value="0">
                                                    Inactive
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="link"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Link
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                required
                                                value={formData.link}
                                                onChange={handleChange}
                                                type="url"
                                                id="link"
                                                name="link"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
