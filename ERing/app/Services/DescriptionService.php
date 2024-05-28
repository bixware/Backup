<?php
declare(strict_types=1);
namespace App\Services;

//Models
use App\Models\MSystemConfiguration;

//Facades
use Illuminate\Database\Eloquent\Collection;


class DescriptionService
{
/**
   * Return get description.
   *
   * @method getDescription
   *
   * @return Collection;
   */

 /*  public static function createDescription():? Collection
  {

    return description::get();

} */
public static function getDescription():? Collection
{

  return MSystemConfiguration::getDescription();

}
}
