<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequest;
use App\Http\Requests\UpdateRequest;
use App\Http\Traits\ResponseTrait;
use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    use ResponseTrait;

    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $todos = Todo::where('user_id', Auth::user()->id)
            ->get();

        return $this->success($todos);
    }

    /**
     * @param StoreRequest $request
     * @return JsonResponse
     */
    public function store(StoreRequest $request): JsonResponse
    {
        $todo = new Todo();
        $todo->text = $request->text;
        $todo->is_complete = false;
        $todo->user_id = Auth::user()->id;
        $todo->save();

        return $this->success($todo, 201);
    }

    /**
     * @param UpdateRequest $request
     * @param Todo $todo
     * @return JsonResponse
     */
    public function update(UpdateRequest $request, Todo $todo): JsonResponse
    {
        $todos = Todo::where('user_id', Auth::user()->id)
            ->where('id', $todo->id)
            ->first();

        if ($todos === null) {
            return $this->failed('The item is not belong to this user');
        }

        $todos->text = $request->text;
        $todos->is_complete = $request->is_complete;
        $todos->save();
        $todos->is_complete = (bool)$todos->is_complete;

        return $this->success($todos);
    }

    /**
     * @param Todo $todo
     * @return JsonResponse
     */
    public function destroy(Todo $todo): JsonResponse
    {
        $todos = Todo::query()
            ->where('user_id', Auth::user()->id)
            ->where('id', $todo->id)
            ->first();

        if ($todos === null) {
            return $this->failed('The item is not belong to this user');
        }

        $todos->delete();

        return $this->success([]);
    }
}
