<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function auth(AuthRequest $request){
        info($request);
        //$data = $request;
        $data = $request->validated();
        /** @var  \App\Models\User $user */
        $user = User::create([
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'lastName' => $data['lastName'],
            'firstName' => $data['firstName'],
            'surName' => $data['surName'],
            'phone' => $data['phone'],
            'keyOO' => $data['keyOO'],
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user','token'));
    }

    public function login(LoginRequest $request){
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)){
            return response([
                'message' => 'E-mail или пароль не верны'
            ], 422);
        }
        /** @var  User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        info($token);
        return response(compact('user','token'));
    }


    public function logout(Request $request){
        /** @var  User $user */
        if ($token = $request->bearerToken()) {
            $model = Sanctum::$personalAccessTokenModel;
            $accessToken = $model::findToken($token);
            $accessToken->delete();
        }

        return response('', 204);
//        $user = $request->user();
//        $user = createAccessToken()->delete();
//        return response('',204);
    }
}
