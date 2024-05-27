<?php

namespace App\Http\Controllers\CommercialHead;

use App\Http\Controllers\Controller;
use App\Services\GeneralService;

use Illuminate\View\View;


class ReportsController extends Controller {




    /**
     * Reports
     * @return \Illuminate\View\View
     */
    public function index(): View {
        return view('app.commercial-head.reports.index', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore(),
        ]);
    }

    /**
     * MPOS
     * @return \Illuminate\View\View
     */
    public function mpos(): View {
        return view('app.commercial-head.reports.mpos', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore(),
        ]);
    }

    /**
     * SAP
     * @return \Illuminate\View\View
     */
    public function sap(): View {
        return view('app.commercial-head.reports.sap', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore(),
        ]);
    }


    /**
     * BankMiss
     * @return \Illuminate\View\View
     */
    public function bankmis(): View {
        return view('app.commercial-head.reports.bank-mis', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore(),
        ]);
    }

    /**
     * Bank Statement
     * @return \Illuminate\View\View
     */
    public function bankStatement(): View {
        return view('app.commercial-head.reports.bank-statement', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore(),
        ]);
    }


    /**
     * Bank Statement
     * @return \Illuminate\View\View
     */
    public function reportsSummary(): View {
        return view('app.commercial-head.reports.all-sales-collection', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore(),
        ]);
    }



    public function others(): View {
        return view('app.commercial-head.reports.other-reports', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore(),
        ]);
    }
    public function unallocated(): View {
        return view('app.commercial-head.reports.un-allocated-transaction', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore(),
        ]);
    }





    /**
     * Bank statement Reconciliation
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function BankStatementRecon() {
        return view('app.commercial-head.reports.bank-statement-reconciliation', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore(),
        ]);
    }


}
