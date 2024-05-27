<?php

namespace App\Http\Controllers\CommercialHead;

use App\Http\Controllers\Controller;
use App\Services\GeneralService;

use Illuminate\View\View;


class ExceptionController extends Controller {




    /**
     * Reports
     * @return \Illuminate\View\View
     */
    public function index(): View {
        return view('app.commercial-head.exceptions.index', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore(),
        ]);
    }

    /**
     * MPOS
     * @return \Illuminate\View\View
     */
    public function cash(): View {
        return view('app.commercial-head.exceptions.cash', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore(),
        ]);
    }

    /**
     * SAP
     * @return \Illuminate\View\View
     */
    public function card(): View {
        return view('app.commercial-head.exceptions.card', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore(),
        ]);
    }


    /**
     * BankMiss
     * @return \Illuminate\View\View
     */
    public function wallet(): View {
        return view('app.commercial-head.exceptions.wallet', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore(),
        ]);
    }


    /**
     * UPI Exception
     * @return \Illuminate\View\View
     */
    public function upi(): View {
        return view('app.commercial-head.exceptions.upi', [
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





    public function reconciliationSummary(): View {
        return view('app.commercial-head.reports.reconciliation-summary', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore(),
        ]);
    }



}