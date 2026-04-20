'use client';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import axiosInstance from 'src/lib/axios';
import { CONFIG } from 'src/global-config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const COLUMNS = [
  { id: 'name', label: 'نام' },
  { id: 'constituency', label: 'حوزه انتخابیه' },
  { id: 'education', label: 'تحصیلات' },
  { id: 'committees', label: 'کمیسیون' },
  { id: 'votesCount', label: 'آرا' },
  { id: 'actions', label: '' },
];

// ----------------------------------------------------------------------

export function SearchView() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res;
        if (debouncedQuery.trim()) {
          res = await axiosInstance.get('/api/politicians/search', {
            params: { q: debouncedQuery },
          });
          setData(Array.isArray(res.data) ? res.data : res.data.data || []);
          setTotal(Array.isArray(res.data) ? res.data.length : res.data.total || 0);
        } else {
          res = await axiosInstance.get('/api/politicians', {
            params: { limit: rowsPerPage, offset: page * rowsPerPage },
          });
          setData(res.data.data || []);
          setTotal(res.data.total || 0);
        }
      } catch (err) {
        console.error('Failed to fetch politicians:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [debouncedQuery, page, rowsPerPage]);

  const handleChangePage = useCallback((_, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const serverUrl = CONFIG.serverUrl || 'http://localhost:3000';

  const getAvatarUrl = (avatar) => {
    if (!avatar) return null;
    if (avatar.startsWith('http')) return avatar;
    return `${serverUrl}${avatar}`;
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Toolbar */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h4">شناخت افراد</Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            size="small"
            placeholder="جستجوی نام، حوزه، کمیسیون..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
            sx={{ width: { xs: 180, sm: 280 } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" width={18} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>
      </Stack>

      {/* Table */}
      <Box
        sx={{
          borderRadius: 2,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          overflow: 'hidden',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'background.neutral' }}>
                {COLUMNS.map((col) => (
                  <TableCell key={col.id} align={col.id === 'actions' ? 'right' : 'left'}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={COLUMNS.length} align="center" sx={{ py: 8 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={COLUMNS.length} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">نتیجه‌ای یافت نشد</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((p) => (
                  <TableRow
                    key={p.id}
                    hover
                    sx={{ cursor: 'pointer', '&:last-child td': { border: 0 } }}
                    onClick={() => router.push(paths.dashboard.profile.view(p.memberId || p.id))}
                  >
                    {/* Name + Avatar */}
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                          src={getAvatarUrl(p.avatar)}
                          sx={{ width: 40, height: 40, fontSize: 14 }}
                        >
                          {p.name?.[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">{p.name}</Typography>
                          {p.politicalParty && (
                            <Typography variant="caption" color="text.secondary">
                              {p.politicalParty}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    </TableCell>

                    {/* Constituency */}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {p.constituency || '—'}
                      </Typography>
                    </TableCell>

                    {/* Education */}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 200 }} noWrap>
                        {p.education || '—'}
                      </Typography>
                    </TableCell>

                    {/* Committees */}
                    <TableCell>
                      {p.committees ? (
                        <Tooltip title={p.committees}>
                          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 200 }} noWrap>
                            {p.committees.split('|')[0]?.trim()}
                          </Typography>
                        </Tooltip>
                      ) : (
                        <Typography variant="body2" color="text.disabled">—</Typography>
                      )}
                    </TableCell>

                    {/* Votes */}
                    <TableCell>
                      <Typography variant="body2">
                        {p.votesCount || '—'}
                      </Typography>
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right">
                      <Button
                        size="small"
                        variant="outlined"
                        endIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                      >
                        پروفایل
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50, 100]}
          labelRowsPerPage="تعداد در صفحه:"
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} از ${count}`}
        />
      </Box>
    </DashboardContent>
  );
}
