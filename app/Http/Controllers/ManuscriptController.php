<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Ocde;
use App\Models\Ods;
use App\Models\Country;
use App\Models\Manuscript;

class ManuscriptController extends Controller
{

    public function index()
    {
        $manuscripts = Manuscript::with('ods', 'ocde', 'country')->get();
        $ocdes = Ocde::all();
        $odss = Ods::all();
        $countries = Country::all();
        return Inertia::render('Manuscripts/Index', [
            'manuscripts' => $manuscripts,
            'ocdes' => $ocdes,
            'odss' => $odss,
            'countries'=> $countries,
        ]);
    }
    

    public function create()
    {
        $ocdes = Ocde::all();
        $odss = Ods::all();
        $countries = Country::all();
        return Inertia::render('Manuscripts/Create', [
            'ocdes' => $ocdes,
            'odss' => $odss,
            'countries' => $countries,
        ]);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'institution' => 'required',
            'name' => 'required',
            'summary' => 'required',
            'type'=> 'required',
            'apc'=> 'required',
            'apc_value'=> 'string',
            'q'=> 'required',
            'index_base'=> 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'status' => 'required',
            'link' => 'required|url',
            'country' => 'required',
            'ods' => 'required|array',
            'ocde' => 'required|array',
        ]);
        
        $manuscript = Manuscript::create($data);
        $manuscript->country()->associate($request->input('country'));
        $manuscript->save();
        if ($request->has('ods')) {
            $manuscript->ods()->attach($request->input('ods'));
        }
        if ($request->has('ocde')) {
            $manuscript->ocde()->attach($request->input('ocde'));
        }
        return redirect()->back();
    }


    public function show($id)
    {
        $manuscript = Manuscript::with('ods', 'ocde', 'country')->find($id);
        if (!$manuscript) {
            return response()->json(['message' => 'registro no encontrado'], 404);
        }
        return Inertia::render('Manuscripts/Show', [
            'manuscript' => $manuscript,
        ]);
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        $event = Manuscript::find($id);
        if (!$event) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }
        $event->delete();
        return Inertia::location(route('manuscripts.index'));
    }
}
