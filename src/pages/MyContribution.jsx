
import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthContext } from '../Context/AuthContext';
import { use } from 'react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const MyContribution = () => {
    const { user } = use(AuthContext);
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    // generate PDF for a single contribution (simple, clear)
    // Uses jsPDF and jsPDF-AutoTable (see https://github.com/parallax/jsPDF and https://github.com/simonbengtsson/jsPDF-AutoTable)
    const generatePdfFor = (c) => {
        // Simple, clear single-contribution PDF
        try {
            Swal.fire({ title: 'Preparing PDF...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            const doc = new jsPDF({ unit: 'pt', format: 'a4' });
            const pageWidth = doc.internal.pageSize.getWidth();
            const margin = 40;

            // Title
            doc.setFontSize(16);
            doc.text('Contribution Receipt', pageWidth / 2, 50, { align: 'center' });

            // Key/value rows
            const rows = [
                ['Contributor', c.contributorName || c.email || '-'],
                ['Email', c.email || '-'],
                ['Phone', c.phone || '-'],
                ['Address', c.address || '-'],
                ['Issue', c.issueTitle || '-'],
                // Use ASCII currency code to avoid missing-glyph issues in PDF fonts
                ['Amount', c.amount != null ? `BDT ${c.amount}` : '-'],
                ['Date', c.date ? new Date(c.date).toLocaleString() : '-'],
            ];

            // render table using autoTable(doc, options)
            autoTable(doc, {
                startY: 80,
                head: [['Field', 'Value']],
                body: rows,
                theme: 'plain',
                styles: { fontSize: 11 },
                columnStyles: { 0: { cellWidth: 120, fontStyle: 'bold' }, 1: { cellWidth: pageWidth - margin * 2 - 120 } },
                margin: { left: margin, right: margin }
            });

            const finalY = doc.lastAutoTable?.finalY ?? 140;
            doc.setFontSize(11);
            doc.text('Additional info', margin, finalY + 24);
            const info = c.additionalInfo || '-';
            const split = doc.splitTextToSize(info, pageWidth - margin * 2);
            doc.text(split, margin, finalY + 40);

            const filename = `contribution_${(user?.email || 'user').replace(/[@.]/g, '_')}_${c._id || Date.now()}.pdf`;
            doc.save(filename);
            Swal.close();
            console.log('PDF saved:', filename);
        } catch (err) {
            Swal.close();
            console.error('PDF generation error', err);
            Swal.fire('Error', 'Could not generate PDF. See console for details.', 'error');
        }
    };

    // generate a clean full report for all contributions
    const generateFullReport = () => {
        if (!contributions || contributions.length === 0) {
            Swal.fire('No data', 'No contributions to export.', 'info');
            return;
        }
        try {
            Swal.fire({ title: 'Preparing PDF...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            const doc = new jsPDF({ unit: 'pt', format: 'a4' });
            const pageWidth = doc.internal.pageSize.getWidth();
            const margin = 36;

            // Header
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text('Civix - Contributions Report', margin, 40);
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text(`User: ${user?.email || '-'}`, pageWidth - margin, 40, { align: 'right' });
            doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - margin, 54, { align: 'right' });

            const body = contributions.map((c, i) => ([
                i + 1,
                c.issueTitle || '-',
                // Use ASCII currency code in PDF to ensure symbol renders correctly
                c.amount != null ? `BDT ${c.amount}` : '-',
                c.contributorName || c.email || '-',
                c.phone || '-',
                c.address || '-',
                c.date ? new Date(c.date).toLocaleString() : '-',
                c.additionalInfo || '-'
            ]));

            // Render table of rows
            // render table using autoTable(doc, options)
            autoTable(doc, {
                startY: 70,
                head: [["#", "Issue Title", "Amount", "Contributor", "Phone", "Address", "Date", "Info"]],
                body,
                styles: { fontSize: 9, cellPadding: 6 },
                headStyles: { fillColor: [30, 64, 175], textColor: 255 },
                theme: 'striped',
                margin: { left: margin, right: margin }
            });

            // Add simple footer page numbers after table is rendered
            const totalPages = doc.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                doc.setPage(i);
                doc.setFontSize(9);
                doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 20, { align: 'right' });
            }

            const filename = `contributions_${(user?.email || 'user').replace(/[@.]/g, '_')}_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.pdf`;
            doc.save(filename);
            Swal.close();
            console.log('Full report saved:', filename);
        } catch (err) {
            Swal.close();
            console.error('Full PDF error', err);
            Swal.fire('Error', 'Could not generate PDF. See console for details.', 'error');
        }
    };

    useEffect(() => {
        // don't run until we have an email
        if (!user?.email) {
            setContributions([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        fetch(`http://localhost:3000/contributions?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`,
            }
        })
            .then(res => {
                if (!res.ok) throw new Error(`Status ${res.status}`);
                return res.json();
            })
            .then(data => {
                setContributions(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                console.error('Failed to load contributions', err);
                setContributions([]);
            })
            .finally(() => setLoading(false));

    }, [user?.email, user?.accessToken]);

    return (
        <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-semibold">My Contributions</h2>
                <button onClick={generateFullReport} className="ml-auto bg-orange-500 hover:bg-orange-700 text-white px-3 py-1 rounded">Download Report</button>
            </div>
            {loading ? (
                <div className="text-gray-500">Loading contributions...</div>
            ) : contributions.length === 0 ? (
                <div className="text-gray-600">No contributions found for {user?.email}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Issue Title</th>
                                <th>Amount</th>
                                <th>Contributor</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Date</th>
                                <th>Info</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contributions.map((c, idx) => (
                                <tr key={c._id || idx}>
                                    <td>{idx + 1}</td>
                                    <td>{c.issueTitle || '-'}</td>
                                    <td>৳{c.amount ?? 0}</td>
                                    <td>{c.contributorName || c.email}</td>
                                    <td>{c.phone || '-'}</td>
                                    <td>{c.address || '-'}</td>
                                    <td>{c.date ? new Date(c.date).toLocaleString() : '-'}</td>
                                    <td className="max-w-xs wrap-break-word">{c.additionalInfo || '-'}</td>
                                    <td>
                                        <button onClick={() => generatePdfFor(c)} className="bg-orange-500 hover:bg-orange-700 text-white px-2 py-1 rounded">Download</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyContribution;