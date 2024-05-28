<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Http\Middleware\BaseMiddleware;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class RefreshToken extends BaseMiddleware
{
  public function handle($request, Closure $next)
  {
    $token = $newToken = null;
    try {
      $token = JWTAuth::parseToken();
      $token->authenticate();
    } catch (TokenExpiredException $e) {
      // Token expired: try refresh
      try {
        $newToken = $token->refresh();
      } catch (JWTException $e) {
        // Refresh failed (refresh expired)
      }
    } catch (JWTException $e) {
      // Invalid token
    }

    $response = $next($request);

    //Excel出力等、ヘッダー付与ができないレスポンスは除いて
    if (method_exists($response, 'withHeaders')) {
      //新しいトークンが発行できたらクライアントにヘッダーで通知
      if ($newToken) {
        $response->withHeaders([
          'newtoken' => $newToken,
          'token_type' => 'bearer',
          'expires_in' => config('jwt.ttl') * 60
        ]);
      }
    }
    return $response;
  }
}
