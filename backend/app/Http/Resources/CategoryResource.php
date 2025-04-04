<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'created_at' => $this->created_at
                ->setTimezone('America/Sao_Paulo')
                ->format('d/m/Y') . ' às ' . $this->created_at->setTimezone('America/Sao_Paulo')->format('H:i'),

            'updated_at' => $this->updated_at->setTimezone('America/Sao_Paulo')
                ->format('d/m/Y') . ' às ' . $this->updated_at->setTimezone('America/Sao_Paulo')->format('H:i'),

        ];
    }
}
