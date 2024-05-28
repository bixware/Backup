<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Response;

class CustomModelNotFoundException extends Exception
{
  public function render()
  {
    return response()->json([
      'status' => false,
      'code' => Response::HTTP_NOT_FOUND,
      'message' => $this->getMessage(),
    ], Response::HTTP_NOT_FOUND);
  }
}
