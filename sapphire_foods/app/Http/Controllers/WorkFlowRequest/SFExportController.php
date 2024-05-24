<?php

namespace App\Http\Controllers\WorkFlowRequest;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class SFExportController extends Controller
{
    public function reportListExport(Request $request)
    {
        // dd($request->all());
        $results = DB::select('SF_REPORT_ALL :status,:fromdate,:todate', [
            'status'        => $request->status,
            'fromdate'        => $request->fromdate,
            'todate'        => $request->todate,
        ]);
        $spreadsheet = new Spreadsheet();

        $sheet = $spreadsheet->getActiveSheet();



        $sheet->getStyle('A1:AH1')->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => '#A0A0A0'], // Grey color
            ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => ['rgb' => 'FFF3C7'], // Light Yel-love color
            ],
            // 'borders' => [
            //     'allBorders' => [
            //         'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
            //         'color' => ['rgb' => '000000'], // Black color
            //     ],
            // ],

        ]);








        // $sheet->getStyle('A1:AD1')->applyFromArray($headerStyle);

        // headings
        $sheet->setCellValue('A1', "Request ID");
        $sheet->setCellValue('B1', "Workflow");
        $sheet->setCellValue('C1', "Brand");
        $sheet->setCellValue('D1', "Request Status");
        $sheet->setCellValue('E1', "Category");
        $sheet->setCellValue('F1', "Vendor Code");
        $sheet->setCellValue('G1', "Vendor Name");
        $sheet->setCellValue('H1', "SKU Code");
        $sheet->setCellValue('I1', "SKU Description");
        $sheet->setCellValue('J1', "Price Changed From");
        $sheet->setCellValue('K1', "Price Changed To");
        $sheet->setCellValue('L1', "DC/DSD");
        $sheet->setCellValue('M1', "Recipe Name");
        $sheet->setCellValue('N1', "FG Code");
        $sheet->setCellValue('O1', "Initiator File Name");
        $sheet->setCellValue('P1', "Initiator Remark");
        $sheet->setCellValue('Q1', "Initiated Date");
        $sheet->setCellValue('R1', "Initiated By");
        $sheet->setCellValue('S1', "Level 1 Action");
        $sheet->setCellValue('T1', "Level 1 Actioned By");
        $sheet->setCellValue('U1', "Level 1 Remark");
        $sheet->setCellValue('V1', "Level 1 Action Date");
        $sheet->setCellValue('W1', "Level 2 Action");
        $sheet->setCellValue('X1', "Level 2 Actioned By");
        $sheet->setCellValue('Y1', "Level 2 Remark");
        $sheet->setCellValue('Z1', "Level 2 Action Date");
        $sheet->setCellValue('AA1', "Level 3 Action");
        $sheet->setCellValue('AB1', "Level 3 Actioned By");
        $sheet->setCellValue('AC1', "Level 3 Remark");
        $sheet->setCellValue('AD1', "Level 3 Action Date");
        $sheet->setCellValue('AE1', "IT File Name");
        $sheet->setCellValue('AF1', "IT Actioned By");
        $sheet->setCellValue('AG1', "IT Remark");
        $sheet->setCellValue('AH1', "IT Date");


        // Write data to the sheet
        $row = 2;
        foreach ($results as $result) {

            // dd($result);
            $sheet->setCellValue('A' . $row, $result->requestNo);
            $sheet->setCellValue('B' . $row, $result->workFlowName);
            $sheet->setCellValue('C' . $row, $result->brand);
            $sheet->setCellValue('D' . $row, $result->RequestStatus);
            $sheet->setCellValue('E' . $row, $result->category);
            $sheet->setCellValue('F' . $row, $result->vendorCode);
            $sheet->setCellValue('G' . $row, $result->vendorDescription);
            $sheet->setCellValue('H' . $row, $result->SKUCode);
            $sheet->setCellValue('I' . $row, $result->SKUDescription);
            $sheet->setCellValue('J' . $row, $result->PriceChangeFrom);
            $sheet->setCellValue('K' . $row, $result->PriceChangeTo);
            $sheet->setCellValue('L' . $row, $result->dcdsdName);
            $sheet->setCellValue('M' . $row, $result->receipeName);
            $sheet->setCellValue('N' . $row, $result->FGCode);
            $sheet->setCellValue('O' . $row, $result->INIFileUpload);
            $sheet->setCellValue('P' . $row, $result->InitiatorRemarks);
            $sheet->setCellValue('Q' . $row, $result->InitiatedOn);
            $sheet->setCellValue('R' . $row, $result->InitiatedBy);
            $sheet->setCellValue('S' . $row, $result->Level1ActionBy);
            $sheet->setCellValue('T' . $row, $result->Level1ActionOn);
            $sheet->setCellValue('U' . $row, $result->Level1ActionRemarks);
            $sheet->setCellValue('V' . $row, $result->Level2ActionBy);
            $sheet->setCellValue('W' . $row, $result->Level2ActionOn);
            $sheet->setCellValue('X' . $row, $result->Level2ActionRemarks);
            $sheet->setCellValue('Y' . $row, $result->Level3ActionBy);
            $sheet->setCellValue('Z' . $row, $result->Level3ActionOn);
            $sheet->setCellValue('AA' . $row, $result->Level3ActionRemarks);
            $sheet->setCellValue('AB' . $row, $result->ITActionBy);
            $sheet->setCellValue('AC' . $row, $result->ITActionOn);
            $sheet->setCellValue('AD' . $row, $result->ITActionRemarks);
            $sheet->setCellValue('AE' . $row, $result->ITFileUpload);
            $sheet->setCellValue('AF' . $row, $result->ConcludedBy);
            $sheet->setCellValue('AG' . $row, $result->ConcludedRemarks);
            $sheet->setCellValue('AH' . $row, $result->ConcludedOn);

            $row++;
        }

        try {

            // Create a writer object for Xlsx format
            $writer = new Xlsx($spreadsheet);

            // Specify the directory path where you want to save the Xlsx file
            $directoryPath = storage_path('app/public/ExportFile/');


            // Create the directory if it doesn't exist
            if (!is_dir($directoryPath)) {
                mkdir($directoryPath, 0777, true);
            }



            // Specify the file path within the directory
            $fileName = 'SF_Report_' . now()->format('d-m-Y') . '.xlsx';
            $filePath = $directoryPath . $fileName;


            // Save the spreadsheet to the specified file path
            $writer->save($filePath);
        } catch (\Throwable $th) {
            throw new Exception($th->getMessage());
        }

        // Return response or perform any additional actions as needed
        return response()->json(['message' => 'Excel file generated successfully']);
    }
}
