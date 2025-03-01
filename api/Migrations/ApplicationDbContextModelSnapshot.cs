﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using api.Data;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("api.Models.Herois", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Altura")
                        .HasColumnType("numeric");

                    b.Property<DateTime?>("DataNascimento")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("NomeHeroi")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal>("Peso")
                        .HasColumnType("numeric");

                    b.HasKey("Id");

                    b.HasIndex("NomeHeroi")
                        .IsUnique();

                    b.ToTable("Herois");
                });

            modelBuilder.Entity("api.Models.HeroisSuperpoderes", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("HeroiId")
                        .HasColumnType("integer");

                    b.Property<int>("SuperpoderId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("HeroiId");

                    b.HasIndex("SuperpoderId");

                    b.ToTable("HeroisSuperpoderes");
                });

            modelBuilder.Entity("api.Models.Superpoderes", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Descricao")
                        .HasColumnType("text");

                    b.Property<string>("Superpoder")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Superpoderes");
                });

            modelBuilder.Entity("api.Models.HeroisSuperpoderes", b =>
                {
                    b.HasOne("api.Models.Herois", "Heroi")
                        .WithMany("HeroisSuperpoderes")
                        .HasForeignKey("HeroiId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Superpoderes", "Superpoder")
                        .WithMany("HeroisSuperpoderes")
                        .HasForeignKey("SuperpoderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Heroi");

                    b.Navigation("Superpoder");
                });

            modelBuilder.Entity("api.Models.Herois", b =>
                {
                    b.Navigation("HeroisSuperpoderes");
                });

            modelBuilder.Entity("api.Models.Superpoderes", b =>
                {
                    b.Navigation("HeroisSuperpoderes");
                });
#pragma warning restore 612, 618
        }
    }
}
