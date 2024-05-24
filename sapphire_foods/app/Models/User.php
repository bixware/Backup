<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{

    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = "tbl_mUsers";
    protected $primaryKey = 'userID';

    // protected $primaryKey = 'userUID';

    protected $fillable = [
        'name',
        'email',
        'password',
        'roleUID',
        'businessUnitUID',
        'isActive'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public function getJWTIdentifier()
    {
        return $this->getKey();
    }




    public function getJWTCustomClaims()
    {
        return [];
    }

    public function getWorkFlowStatgeUser()
    {
        return $this->hasMany(WorkFlowStageUser::class, 'userUID', 'userID');
    }
    // public function statusRemarks()
    // {
    //     return $this->hasMany(WorkFlowStatusRemarks::class, 'workFlowRequestUID', 'workFlowRequestUID');
    // }
    // public function roles()
    // {
    //     return $this->belongsToMany(Role::class);
    // }

    // public function hasRole($role)
    // {
    //     return $this->roles()->where('name', $role)->exists();
    // }
}
