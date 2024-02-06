import React from "react";
import ExcelJS from "exceljs";

const ExcelReportButton = ({ data }) => {
    const generateReport = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Manuscript Report");

        // Agrega encabezados
        worksheet.addRow([
            "ID",
            "Nombre",
            "Institución",
            "Tipo de manuscrito",
            "Descripción",
            "APC",
            "Q",
            "Base indexada",
            "País",
            "Fecha de Inicio",
            "Fecha de Fin",
            "Estado",
            "Link",
            "OCDE",
            "ODS",
        ]);

        // Agrega datos
        data.forEach((item) => {
            const ocdeNames = item.ocde.map(
                (ocde) => `${ocde.code} - ${ocde.name}`
            );
            const odsNames = item.ods.map(
                (ods) => `${ods.name} - ${ods.description}`
            );

            worksheet.addRow([
                item.id,
                item.name,
                item.institution,
                item.type,
                item.summary,
                item.apc_value,
                item.q,
                item.index_base,
                item.country.name,
                item.start_date,
                item.end_date,
                item.status ? "vigente" : "no vigente",
                item.link,
                ocdeNames.join(", "), 
                odsNames.join(", ")
            ]);
        });

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "ReporteManuscritos.xlsx";
            a.click();
        });
    };

    return (
        <button
            onClick={generateReport}
            className="rounded-md bg-green-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 mr-3"
        >
            Reporte
        </button>
    );
};

export default ExcelReportButton;
