<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import type {
    ColumnDef,
    ColumnFiltersState,
    ExpandedState,
    SortingState,
    VisibilityState
} from '@tanstack/vue-table'
import {
    FlexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable
} from '@tanstack/vue-table'
import { h, onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { apiUrl } from '@/utils/environment'
import { ArrowUpDown, Loader2 } from 'lucide-vue-next'
import { valueUpdater } from '@/lib/utils'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const userStore = useUserStore()
const router = useRouter()

watch(
    () => userStore.getUserInfo.name,
    (name) => {
        if (!name) {
            router.push('/')
        }
    },
    { immediate: true }
)

interface IQuestions {
    question: string;
    userAnswer: string;
}

interface Logs extends Document {
    name: string;
    score: number;
    userAnswer: IQuestions[];
}

const isLoading = ref(false)

const data = ref<Logs[]>([])

async function getUserLogs() {
    isLoading.value = true
    try {
        const response = await fetch(`${apiUrl}/api/logs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
        }

        const logsData = await response.json()

        const sortedUserLogs = (logsData.logs as Logs[]).filter((log: Logs) => log.name === userStore.getUserInfo.name);

        data.value = sortedUserLogs
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    getUserLogs()
})

console.log(data);


const columns: ColumnDef<Logs>[] = [
    {
        accessorKey: 'id',
        header: 'No',
        enableSorting: false,
        cell: ({ row }) => h('div', { class: 'capitalize' }, row.index + 1)
    },
    {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: false,
        cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('name'))
    },
    {
        accessorKey: 'score',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Scores', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('score'))
    },
    {
        accessorKey: 'createdAt',
        header: 'Date/Time',
        enableSorting: false,
        cell: ({ row }) => h('div', { class: 'capitalize' }, dayjs(row.getValue('createdAt')).fromNow())
    },
]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = useVueTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),

    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
    onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),

    state: {
        get sorting() {
            return sorting.value
        },
        get columnFilters() {
            return columnFilters.value
        },
        get columnVisibility() {
            return columnVisibility.value
        },
        get rowSelection() {
            return rowSelection.value
        },
        get expanded() {
            return expanded.value
        }
    },

    initialState: {
        pagination: {
            pageSize: 5,
        },
    }
})

</script>

<template>
    <div class="xl:w-3/4 w-[99%] transition-all">
        <div class="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <TableHead v-for="header in headerGroup.headers" :key="header.id">
                            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                :props="header.getContext()" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="table.getRowModel().rows?.length">
                        <template v-for="row in table.getRowModel().rows" :key="row.id">
                            <TableRow :data-state="row.getIsSelected() && 'selected'">
                                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                                </TableCell>
                            </TableRow>
                            <TableRow v-if="row.getIsExpanded()">
                                <TableCell :colspan="row.getAllCells().length">
                                    {{ JSON.stringify(row.original) }}
                                </TableCell>
                            </TableRow>
                        </template>
                    </template>

                    <TableRow v-else>
                        <TableCell :colspan="columns.length" class="h-24 text-center">
                            <template v-if="isLoading">
                                <div class="w-full flex justify-center items-center">
                                    <Loader2 class="w-8 h-8 text-green-500 animate-spin" />
                                </div>
                            </template>
                            <template v-else>No results.</template>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <div class="flex items-center justify-end space-x-2 py-4">
            <div class="flex-1 text-sm text-muted-foreground">
                {{ table.getFilteredRowModel().rows.length }} History logs
            </div>
            <div class="space-x-2">
                <Button variant="outline" size="sm" :disabled="!table.getCanPreviousPage()"
                    @click="table.previousPage()">
                    Previous
                </Button>
                <Button variant="outline" size="sm" :disabled="!table.getCanNextPage()" @click="table.nextPage()">
                    Next
                </Button>
            </div>
        </div>
    </div>
</template>
