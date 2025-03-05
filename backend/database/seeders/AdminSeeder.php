<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ["email" => "joaolucas@mail.com"],
            [
                "name" => "João Lucas",
                "password" => Hash::make("Joaoluca$1"),
                "is_admin" => true,
                "birth_date" => "01/05/2002",
                "phone_number" => "44998134433",
                "gender" => "m",
            ]
        );
    }
}
