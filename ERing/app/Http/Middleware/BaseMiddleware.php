<?php

namespace App\Http\Middleware;

/**
 * 基底ミドルウェア
 */
class BaseMiddleware
{
  /**
   * 共通レスポンスヘッダー
   */
  protected function responseHeader()
  {
    return [
      'Cache-Control' => 'no-cache, no-store, max-age=0, must-revalidate',
      'Expires' => 'Mon, 26 Jul 1997 05:00:00 GMT',
      'Pragma' => 'no-cache',
    ];
  }
}
