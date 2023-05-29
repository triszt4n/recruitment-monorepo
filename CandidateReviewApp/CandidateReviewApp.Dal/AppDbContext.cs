using CandidateReviewApp.Dal.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CandidateReviewApp.Dal
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Candidate> Candidates => Set<Candidate>();
        public DbSet<Judgement> Judgements => Set<Judgement>();
        public DbSet<Period> Periods => Set<Period>();
    }
}
