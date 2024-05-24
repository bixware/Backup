<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WorkFlowStageUserValidation extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'workFlowUID' => 'required',
            // 'workFlowStageUID' => 'required',
            // 'stages.*.stageNo' => 'required|integer',
            // 'stages.*.stageName' => 'required|string|max:255',
            'stages.*.businessUnitUID' => 'required|exists:tbl_mBusinessUnit,businessUnitUID',
            // 'stages.*.userUID' => 'required|exists:tbl_mUsers,userID',

        ];
    }
}
