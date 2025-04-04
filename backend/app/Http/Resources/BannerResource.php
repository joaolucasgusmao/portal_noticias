<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BannerResource extends JsonResource
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
            'description' => $this->description,
            'image' => $this->image,
            'link' => $this->link,
            'positions' => $this->positions,
            'is_active' => (bool) $this->is_active,
            'created_at' => $this->created_at
                ->setTimezone('America/Sao_Paulo')
                ->format('d/m/Y') . ' às ' . $this->created_at->setTimezone('America/Sao_Paulo')->format('H:i'),

            'updated_at' => $this->updated_at->setTimezone('America/Sao_Paulo')
                ->format('d/m/Y') . ' às ' . $this->updated_at->setTimezone('America/Sao_Paulo')->format('H:i'),
        ];
    }
}
