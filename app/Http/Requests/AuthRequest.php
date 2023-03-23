<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {

        return [
            'lastName' =>'required|string|max:33',
            'firstName' =>'required|string|max:33',
            'surName' =>'string|max:33',
            'phone' =>'required|numeric|digits:10',
            'keyOO' =>'required|numeric|digits_between:3,6',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                ->letters()
                ->symbols()
                ]
        ];
    }
}
//<input type="text" pattern="[0-9]{10}"> - Для фронта
