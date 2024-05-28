<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Response;

class CustomModelFoundException extends Exception
{
  public function render()
  {
    return response()->json([
      'status' => false,
      'code' => Response::HTTP_UNPROCESSABLE_ENTITY,
      'message' => $this->getMessage(),
    ], Response::HTTP_UNPROCESSABLE_ENTITY);
  }
}
